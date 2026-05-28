#!/bin/bash

# Kill ports if running
kill -9 $(lsof -ti:8001,3000) 2>/dev/null

echo "🚀 Starting TalentAI Manual Mode"

# Copy .env to backend
cp .env backend_engine/.env 2>/dev/null

# 1. Start Backend
echo "Starting Backend (DeepTutor Engine)..."
cd backend_engine
if [ ! -d "venv" ]; then
    echo "Creating Python Virtual Environment..."
    python3 -m venv venv
fi
source venv/bin/activate
echo "Installing Python dependencies (this may take a minute)..."
pip install -r requirements.txt > /dev/null

# Start Uvicorn in background
python3 -m uvicorn src.api.main:app --host 0.0.0.0 --port 8001 &
BACKEND_PID=$!
echo "✅ Backend running on PID $BACKEND_PID"

# 2. Start Frontend
echo "Starting Frontend..."
cd ..
echo "Installing Node dependencies..."
npm install > /dev/null
npm run dev -- --host &
FRONTEND_PID=$!

echo "✅ Frontend running on PID $FRONTEND_PID"
echo " "
echo "🌐 Access Frontend: http://localhost:3000"
echo "🔌 Access Backend:  http://localhost:8001"
echo " "
echo "Press CTRL+C to stop all services."

# Wait for both
wait $BACKEND_PID $FRONTEND_PID
