from fastapi import FastAPI,UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import onetrain
import requests
import logging
import librosa
from typing import List
from dotenv import load_dotenv

from queue import Queue

os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"  # Arrange GPU devices starting from 0
os.environ["CUDA_VISIBLE_DEVICES"]= "9"  # Set the GPU 2 to use

cur_dir = os.getcwd()
load_dotenv(os.path.join(cur_dir, ".env"))
base_url = os.environ["BASE_URL"]

app = FastAPI()

class Request(BaseModel):
    userCode: int
    modelCode: int
    modelName: str


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger(__name__)
queue = Queue()

# input 값 정리
# modelcode : 몇번 모델인지 가르킴 (숫자)
# exp_dir1 : 만들어지는 목소리 모델명 ex) gosegu, jeongmin (입력받아야함)
# sr2 :  "48k" 고정 (목표 샘플링률)
# if_f0_3 : True 고정 (이 설정 체크 안하면 음 높낮이 X)
# trainset_dir4 : 훈련할 음악파일이 포함된 경로 ex) /home/j-j10e201/jeongmin
# spk_id5 :  0 고정  (화자 ID 지정하는 변수인데 0으로 둬도 문제 X)
# np7 : 16 고정 (할당되는 CPU 수) * 단 로컬 환경이라면 8
# f0method8 : harvest 고정 (음성모델 학습기법 선택, harvest가 전반적으로 무난)
# save_epoch10 : 5 고정 (저장 빈도)
# total_epoch11 : 100 고정 (전체 epoch 수)
# batch_size12 : 8 고정 (그래픽 카드 별 batch size) * 단 로컬 환경이라면 4
# if_save_latest13 : "Yes" 고정 (是로 설정해야 불필요한 파일 저장되지 않음)
# pretrained_G14 : assets/pretrained_v2/f0G40k.pth 고정 (미리 훈련된 G모델 경로)
# pretrained_D15 : assets/pretrained_v2/f0D40k.pth 고정 (미리 훈련된 D 모델 경로)
# gpus16 : 9 고정   (사용할 그래픽 카드 설정, 우리 서버 기준 0 박혀 있음)
# if_cache_gpu17 : "No" 고정  (Yes 설정하면 오류 발생 위험있음)
# if_save_every_weights18 : "No 고정" (저장시 마다 모델 저장 여부 결정, Yes 설정하면 용량 낭비)
# version19 :  "v2" 고정   (모델 버전 선택)
# gpus_rmvpe : "0" 고정 (harvest 버전 사용하면 신경 쓸 필요 없는 값)
# train 함수 실행

# {
#     "modelcode" :12,
#     "usercode" : 1,
#     "exp_dir1" : "joowon",
#     "sr2" : "48k",
#     "if_f0_3" : "True",
#     "trainset_dir4" :  "/home/j-j10e201/joowon",
#     "spk_id5" : 0,
#     "np7" : 16,
#     "f0method8" : "harvest",
#     "save_epoch10" : 5,
#     "total_epoch11" : 100,
#     "batch_size12" : 8,
#     "if_save_latest13" : "Yes",
#     "pretrained_G14" : "assets/pretrained_v2/f0G48k.pth",
#     "pretrained_D15" : "assets/pretrained_v2/f0D48k.pth",
#     "gpus16" : "9",
#     "if_cache_gpu17" : "No",
#     "if_save_every_weights18" : "No",
#     "version19" : "v2",
#     "gpus_rmvpe" : "0"
# }

def sendNotification(userCode, targetCode, msg):
    logger.info("Send notification")
    try:
        response = requests.post(f"{base_url}/api/notify/send",
                                 json={"userCode":userCode,
                                       "name":"train",
                                       "data": {
                                           "targetCode":targetCode,
                                           "content":msg
                                           }})
        logger.info(f"Response status {response.status_code}")
    except requests.exceptions.RequestException as e:
        logger.info(f"Error occurred: {e}")

# 음성 파일들 받아서 저장함
@app.post('/voice/{modelcode}')
async def voice_upload(modelcode: int, files: List[UploadFile] = File(...)):
    save_dir = f'voice/{modelcode}'
    os.makedirs(save_dir, exist_ok=True)
    
    for idx, file in enumerate(files):
        with open(os.path.join(save_dir, f"record{idx + 1}.wav"), "wb") as f:
            f.write(await file.read())
    
    return {"message": "Voicefile upload complete"}

# 모델(pth) 파일을 받아서 저장함
@app.post('/model/{modelcode}')
async def modelupload(modelcode: int, file: UploadFile):
    save_dir = f'model/{modelcode}'
    os.makedirs(save_dir, exist_ok=True)
    
    with open(os.path.join(save_dir, f"pth.pth"), "wb") as f:
        f.write(await file.read())
    
    return {"message": "Model upload complete"}

# 보이스 모델 학습시작
@app.post('/training')
async def training(request: Request, background_tasks: BackgroundTasks):
    modelcode = request.modelCode
    usercode = request.userCode
    modelname = request.modelName
    exp_dir1 = modelcode
    path = f'voice/{modelcode}'
    trainset_dir4 = path 
    total_epoch11 = 0

    
    background_tasks.add_task(worker, modelcode, usercode, modelname, exp_dir1, trainset_dir4, total_epoch11)
    
    return {"message": "Training is ready"}


def worker(modelcode, usercode, modelname, exp_dir1, trainset_dir4, total_epoch11):
    try:
        # 백그라운드에서 실행될 작업들
        time = 0
        path = f'voice/{modelcode}'
        sample_rate = 16000
        file_list =os.listdir(path)
        file_list.sort() 
        
        for i in file_list:
            audio_path = path + "/" + i
            y, sr = librosa.load(audio_path, sr=sample_rate)
            duration = librosa.get_duration(y=y, sr=sr)
            time += round(duration)
        
        total_epoch11 = 100 + ((round(time/60)*round(time/60))/2)
        
        total_epoch11 = round(total_epoch11)
        
        if(total_epoch11 > 200):
            total_epoch11 = 200
        
        onetrain.train1key(         
        modelcode, exp_dir1, "48k" , "True", trainset_dir4, 0, 16, "harvest", 
        5, total_epoch11, 8, "Yes", "assets/pretrained_v2/f0G48k.pth", "assets/pretrained_v2/f0D48k.pth",
        "9", "No", "No", "v2","0"
        )

        msg = f'모델 "{modelname}"의 학습이 완료되었습니다.'
        is_success = "true"

    except Exception as e:
        msg = f'모델 "{modelname}"의 학습에 실패했습니다.'
        is_success = "false"
    
    finally:
        # 모델 생성 여부 전송
        response = requests.get(f"{base_url}/api/dub/check/{modelcode}/{is_success}")

        sendNotification(usercode, modelcode, msg)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app="train-model:app", host='0.0.0.0', port=7865, reload=True)


# @app.route('/train_start_all', methods=['POST'])
# def train_start_all():
    
    # onetrain.train1key("fulljeongmin",
    #                    "48k",
    #                    True,
    #                    "C:\\Users\\SSAFY\\Desktop\\minijeongmin",
    #                    0,
    #                    8,
    #                    "harvest",
    #                    5,
    #                    100,
    #                    4,
    #                    "Yes",
    #                    "assets/pretrained_v2/f0G48k.pth",
    #                    "assets/pretrained_v2/f0D48k.pth",
    #                    "0",
    #                    "No",
    #                    "No",
    #                    "v2",
    #                    "0");    

    