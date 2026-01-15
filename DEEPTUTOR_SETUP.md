# DeepTutor Setup Guide for TalentAI

To enable the interactive "Hojas de Ruta" (Learning Path) functionality, you need to run the DeepTutor local services.

## Prerequisites
- **Python 3.10+**
- **Node.js 18+**

---

## 🚀 One-Command Startup (Recommended)

1. Open a terminal in the project root.
2. Run the following:

```bash
cd reference_deeptutor
# 1. Setup environment (only needed once)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Configure Keys (REQUIRED)
# I already created the .env file for you. 
# Open 'reference_deeptutor/.env' and fill in 'LLM_BINDING_API_KEY'

# 3. Start everything
python3 scripts/start_web.py
```

> [!TIP]
> `start_web.py` will automatically install frontend dependencies (`npm install`) and start both the backend (8001) and frontend (3782). **Do NOT run Step 2 from the previous guide.**

---

## How to use in TalentAI
1. Once the terminal shows `✅ Services are running!`, go to **Talent Bridge** > **Hojas de Ruta**.
2. Click **"Start Session"**.
3. If you still see a "Connection Refused" error, ensure you are using port `3782` and check for any errors in the terminal where you ran the python script.

### Common Troubleshooting
- **Command 'python' not found**: Use `python3` instead.
- **Port 3782 occupied**: Close any previously running `npm run dev` processes.
- **API Errors**: Ensure your `LLM_BINDING_API_KEY` in `reference_deeptutor/.env` is valid.
