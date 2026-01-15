
import sys
import os
import urllib.request
import urllib.parse
import json
import mimetypes
import uuid

def create_knowledge_base(kb_name, files):
    """
    Creates a new Knowledge Base in DeepTutor using the API (native python libs).
    """
    url = "http://localhost:8001/api/v1/knowledge/create"
    boundary = uuid.uuid4().hex
    
    data = []
    
    # Add form field 'name'
    data.append(f'--{boundary}')
    data.append('Content-Disposition: form-data; name="name"')
    data.append('')
    data.append(kb_name)
    
    # Add files
    for file_path in files:
        if not os.path.exists(file_path):
            print(f"Warning: File not found {file_path}")
            continue
            
        filename = os.path.basename(file_path)
        mime_type = mimetypes.guess_type(file_path)[0] or 'application/octet-stream'
        
        with open(file_path, 'rb') as f:
            file_content = f.read()
            
        data.append(f'--{boundary}')
        data.append(f'Content-Disposition: form-data; name="files"; filename="{filename}"')
        data.append(f'Content-Type: {mime_type}')
        data.append('')
        data.append(file_content.decode('utf-8', errors='ignore')) # Simple decode for text files
        
    data.append(f'--{boundary}--')
    data.append('')
    
    body = '\r\n'.join(data).encode('utf-8')
    headers = {
        'Content-Type': f'multipart/form-data; boundary={boundary}',
        'Content-Length': str(len(body))
    }
    
    try:
        req = urllib.request.Request(url, data=body, headers=headers, method='POST')
        print(f"Creating Knowledge Base '{kb_name}'...")
        
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"✅ Success! KB '{kb_name}' created.")
            return result
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        if e.code == 400 and "already exists" in error_body:
             print(f"ℹ️ KB '{kb_name}' already exists.")
             return {"status": "exists"}
        print(f"❌ Error: {e.code} - {error_body}")
        return None
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python create_kb.py <kb_name> <file1> [file2 ...]")
        sys.exit(1)
    
    kb_name = sys.argv[1]
    files = sys.argv[2:]
    
    create_knowledge_base(kb_name, files)
