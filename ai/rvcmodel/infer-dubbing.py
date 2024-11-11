from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from Dubbing_Video_Creator import Infer

import os
import logging

os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"  # Arrange GPU devices starting from 0
os.environ["CUDA_VISIBLE_DEVICES"]= "9"  # Set the GPU 9 to use

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

cur_dir = os.getcwd()
dubbing_path = f"{cur_dir}/dubbing"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 음성 변환 요청
@app.post("/rvc/infer/{userCode}/{videoSourceCode}/{voiceIndex}/{modelCode}/{pitch}")
async def infer(userCode: int, videoSourceCode: int, voiceIndex: str, modelCode: int, pitch: int, file: UploadFile):
    file_path = f"{dubbing_path}/{userCode}/{videoSourceCode}/{voiceIndex}/{modelCode}"
    file_name = "voice_origin.wav"

    try:
        if not os.path.exists(file_path):
            os.makedirs(file_path)

        logger.info(f"File write : {file_path}/{file_name}")
        content = await file.read()
        with open(os.path.join(file_path, file_name), "wb+") as fp:
            fp.write(content)

        # 음성 추론 시작
        inf = Infer.infer(pitch, modelCode, file_path, file_name)

        # 파일 응답
        return FileResponse(inf, media_type="audio/wav", filename=file_name)
    except Exception as e:
        logger.info(f"Error occured: {e}")
        return {"status": 500,
                "message": "음성 변환에 실패했습니다."}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app="infer-dubbing:app", host='0.0.0.0', port=7867, reload=True)
