import base64
import os
from pathlib import Path
from uuid import uuid4

def save_image(image_base64: str, folder_path: str) -> str:
    """Save base64 image to local folder and return the filename"""
    if not image_base64:
        return ""
    
    # Create directory if it doesn't exist
    Path(folder_path).mkdir(parents=True, exist_ok=True)
    
    try:
        # If the string contains metadata (e.g., data:image/png;base64,), strip it
        if "," in image_base64:
            image_base64 = image_base64.split(",")[1]
            
        header = image_base64[:10].lower()
        if "ivbor" in header: ext = ".png"
        elif "/9j/4" in header: ext = ".jpg"
        else: ext = ".png" # Default

        filename = f"{uuid4().hex}{ext}"
        filepath = os.path.join(folder_path, filename)
        
        with open(filepath, "wb") as f:
            f.write(base64.b64decode(image_base64))
            
        return filename
    except Exception:
        return ""

def delete_image(filename: str, folder_path: str) -> bool:
    """Delete image from local folder"""
    if not filename:
        return False
        
    filepath = os.path.join(folder_path, filename)
    try:
        if os.path.exists(filepath):
            os.remove(filepath)
            return True
    except Exception:
        pass
    return False
