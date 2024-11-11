from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from AI_Cover_Creator import Creator, TooLongYoutubeException
from dotenv import load_dotenv

import os, shutil
import requests
import logging

os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"  # Arrange GPU devices starting from 0
os.environ["CUDA_VISIBLE_DEVICES"]= "9"  # Set the GPU 9 to use

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

cur_dir = os.getcwd()
cover_path = f"{cur_dir}/cover"

load_dotenv(os.path.join(cur_dir, ".env"))
base_url = os.environ["BASE_URL"]

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Request(BaseModel):
    youtubeLink: str
    userCode: int
    modelCode: int
    coverCode: int
    coverName: str
    pitch: int


# AI 커버 제작
def create_cover(request: Request):
    userCode = request.userCode
    coverCode = request.coverCode
    coverName = request.coverName
    file = None

    try:
        # 커버 제작
        output = Creator(request).create()

        # 커버 업로드
        file = open(output, 'rb')
        upload = {'file': file}
        
        logger.info("Cover upload")
        response = requests.post(f"{base_url}/api/cover/save/{coverCode}", files=upload)
        response.raise_for_status()
        
        logger.info(f"Response status {response.status_code}")
        msg = f'AI 커버 "{coverName}" 제작이 완료되었습니다.'
        is_success = "true"

    except TooLongYoutubeException as e:
        logger.info(f"Youtube error : {e}")
        msg = f'AI 커버 "{coverName}"의 유튜브 영상 길이가 10분이 넘습니다.'
        is_success = "false"
    
    except Exception as e:
        logger.info(f"Error occurred: {e}")
        msg = f'AI 커버 "{coverName}" 제작에 실패했습니다.'
        is_success = "false"
    
    finally:
        # 커버 생성 여부 전송
        response = requests.get(f"{base_url}/api/cover/check/{coverCode}/{is_success}")

        # 알림 전송
        sendNotification(userCode, coverCode, msg)

        # 폴더 삭제
        if os.path.exists(f"{cover_path}/{userCode}/{coverCode}"):
            if file is not None and not file.closed:
                file.close()
            shutil.rmtree(f"{cover_path}/{userCode}/{coverCode}")
            logger.info(f"Remove {cover_path}/{userCode}/{coverCode}")


# 알림 전송
def sendNotification(userCode, targetCode, msg):
    logger.info("Send notification")
    try:
        response = requests.post(f"{base_url}/api/notify/send",
                                 json={"userCode":userCode,
                                       "name":"cover",
                                       "data": {
                                           "targetCode":targetCode,
                                           "content":msg
                                           }})
        logger.info(f"Response status {response.status_code}")
    except requests.exceptions.RequestException as e:
        logger.info(f"Error occurred: {e}")


# AI 커버 제작 요청
@app.post('/rvc/cover')
def cover(request: Request, background_tasks: BackgroundTasks):
    background_tasks.add_task(create_cover, request)
    return {"status": 200, "message": "Process accepted"}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app="infer-cover:app", host='0.0.0.0', port=7866, reload=True)