import os
import google.generativeai as genai
from typing import List, Dict
import json
import time

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use a model that supports multimodal input (Flash is good for speed/cost)
MODEL_NAME = "gemini-1.5-flash"

def analyze_assessment(answers: Dict[int, str], video_path: str = None) -> Dict:
    """
    Analyzes text answers and optional video interview using Gemini.
    Returns a dictionary with scores and recommendations.
    """
    model = genai.GenerativeModel(MODEL_NAME)
    
    prompt_parts = [
        "You are an expert HR psychologist and AI Ethicist. Analyze the following candidate assessment for a 'Centaur' role (Human-AI Synergetic profile).",
        "The candidate answered questions designed to measure: Simbiosis Humano-IA, Growth Mindset, Adaptability, Thinking speed and Critical analysis.",
        "Crucially, evaluate their capacity to delegate to AI while maintaining critical oversight.",
        "The candidate's text answers are:",
    ]
    
    for q_id, answer in answers.items():
        prompt_parts.append(f"Q{q_id}: {answer}")
        
    prompt_parts.append("\nEvaluate the candidate on: Adaptability, Growth Mindset, Teamwork, Communication.")
    prompt_parts.append("Provide a score from 0 to 100 for each.")
    prompt_parts.append("Also provide 3 job role recommendations based on their profile.")
    prompt_parts.append("Return the output STRICTLY as JSON with the following format:")
    prompt_parts.append("""
    {
        "scores": {
            "adaptability": int,
            "growthMindset": int,
            "teamwork": int,
            "communication": int
        },
        "recommendations": [
            {"role": "string", "match": int} # match percentage
        ],
        "analysis": "string" # brief summary
    }
    """)
    
    input_content = prompt_parts

    # If video is provided, upload it to Gemini File API
    # Note: In a real production app, we would manage file lifecycle/deletion.
    if video_path and os.path.exists(video_path):
        print(f"Uploading video: {video_path}")
        video_file = genai.upload_file(video_path)
        
        # Wait for processing
        while video_file.state.name == "PROCESSING":
            print("Waiting for video processing...")
            time.sleep(2)
            video_file = genai.get_file(video_file.name)
            
        if video_file.state.name == "FAILED":
            print("Video processing failed.")
        else:
            print("Video processed. Adding to prompt.")
            # For gemini-1.5, we pass the file object
            input_content = [video_file] + prompt_parts

    try:
        response = model.generate_content(input_content, generation_config={"response_mime_type": "application/json"})
        result = json.loads(response.text)
        return result
    except Exception as e:
        print(f"AI Analysis Failed: {e}")
        # Return fallback/mock data if AI fails
        return {
            "scores": {"adaptability": 50, "growthMindset": 50, "teamwork": 50, "communication": 50},
            "recommendations": [{"role": "Error analyzing profile", "match": 0}],
            "analysis": "AI Service unavailable."
        }
