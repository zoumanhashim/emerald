import cv2
import requests
import time

# Configuration
API_ENDPOINT = "https://api.theemeraldstandard.com/ingest"
CAMERA_INDEX = 0  # usually 0 for default USB microscope/webcam

def capture_stone(stone_id, weight_carats, grade):
    # 1. Initialize Camera
    cap = cv2.VideoCapture(CAMERA_INDEX)
    if not cap.isOpened():
        print("Error: Could not open microscope.")
        return

    # 2. Capture Image
    print(f"Align Stone {stone_id}. Press 'SPACE' to capture...")
    while True:
        ret, frame = cap.read()
        cv2.imshow('TES Scanner Feed', frame)
        if cv2.waitKey(1) & 0xFF == ord(' '):  # Spacebar to capture
            break

    # 3. Save & Encode
    filename = f"{stone_id}_raw.png"
    cv2.imwrite(filename, frame)
    cap.release()
    cv2.destroyAllWindows()

    # 4. Upload to Backend (Inventory System)
    print(f"Uploading {stone_id} to inventory...")
    with open(filename, 'rb') as img_file:
        payload = {
            'stoneId': stone_id,
            'weight': weight_carats,
            'grade': grade,
            'origin': 'Panjshir Valley'
        }
        files = {'image': img_file}

        try:
            response = requests.post(API_ENDPOINT, data=payload, files=files)
            if response.status_code == 200:
                print(f"✅ SUCCESS: Stone linked to Token ID {response.json().get('tokenId')}")
            else:
                print(f"❌ FAILED: {response.text}")
        except Exception as e:
            print(f"Connection Error: {e}")

# Example Usage
# capture_stone("TES-BATCH1-001", 1.25, "AAA")