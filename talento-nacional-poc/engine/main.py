from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
import models
import shutil
import os
from db import get_db, engine

app = FastAPI(title="Talento Nacional Engine")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    # In production, use Alembic. For POC, this is fine.
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.get("/")
def read_root():
    return {"message": "Talento Nacional Engine is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# --- Employee Endpoints ---

@app.post("/employees/", response_model=models.Employee)
async def create_employee(employee: models.EmployeeCreate, db: AsyncSession = Depends(get_db)):
    db_employee = models.EmployeeDB(**employee.dict())
    db.add(db_employee)
    try:
        await db.commit()
        await db.refresh(db_employee)
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return db_employee

@app.get("/employees/", response_model=List[models.Employee])
async def read_employees(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.EmployeeDB).offset(skip).limit(limit))
    employees = result.scalars().all()
    return employees

@app.get("/employees/{employee_id}", response_model=models.Employee)
async def read_employee(employee_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.EmployeeDB).where(models.EmployeeDB.id == employee_id))
    employee = result.scalar_one_or_none()
    return employee

@app.post("/assessment/submit")
async def submit_assessment(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    answers: str = Form(...), # JSON string
    video: UploadFile = File(None),
    db: AsyncSession = Depends(get_db)
):
    # 1. Find or Create Employee
    # For POC simplicity, if email exists, update it.
    result = await db.execute(select(models.EmployeeDB).where(models.EmployeeDB.email == email))
    employee = result.scalar_one_or_none()
    
    if not employee:
        employee = models.EmployeeDB(name=name, email=email, role="Candidate", status="pending")
        db.add(employee)
        await db.commit()
        await db.refresh(employee)

    # 2. Save Video Locally (Temporary) -> In prod use S3/Storage
    video_path = None
    if video:
        upload_dir = "uploads"
        os.makedirs(upload_dir, exist_ok=True)
        video_path = f"{upload_dir}/{employee.id}_{video.filename}"
        with open(video_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

    # 3. Parse Answers
    import json
    parsed_answers = json.loads(answers)

    # 4. Run Analysis (Synchronous for POC, usually Background Task)
    # We run it here to return immediate results for the demo
    from ai import analyze_assessment
    analysis_result = analyze_assessment(parsed_answers, video_path)

    # 5. Update Employee Record
    employee.status = "completed"
    employee.assessment_data = analysis_result
    db.add(employee)
    await db.commit()

    return analysis_result
