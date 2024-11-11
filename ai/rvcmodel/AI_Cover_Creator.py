from yt_dlp import YoutubeDL
from pydub import AudioSegment
import myinfer as mif
import numpy as np

import os
import librosa

import logging


logger = logging.getLogger(__name__)

cur_dir = os.getcwd()

cover_path = f"{cur_dir}/cover"
model_path = f"{cur_dir}/model"


class Creator:

    def __init__(self, request):
        global youtubeLink, userCode, modelCode, coverCode, coverName, pitch
        youtubeLink = request.youtubeLink
        userCode = request.userCode
        modelCode = request.modelCode
        coverCode = request.coverCode
        coverName = request.coverName
        pitch = request.pitch


    def create(self):
        self.download()
        self.split()
        self.infer()
        output = self.mixing()
        return output


    # 유튜브 음원 다운로드
    def download(self):
        urls = [youtubeLink]

        # ydl_opts 설정
        ydl_opts = {
            'quiet': True,  # 출력을 최소화
            'force_generic_extractor': True,  # 제네릭 추출기 강제 사용
        }

        # YoutubeDL 객체 생성
        yt = YoutubeDL(ydl_opts)

        # 영상 정보 가져오기
        info = yt.extract_info(youtubeLink, download=False)

        if info.get('duration') > 600:
            raise TooLongYoutubeException

        logger.info(f"Start download youtube : {info.get('title')}")

        ydl_opts = {
            'format': 'wav/bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
            }],
            'outtmpl': f'{cover_path}/{userCode}/{coverCode}/origin/{coverCode}.wav'
        }

        yt = YoutubeDL(ydl_opts)
        yt.download(urls)


    # 음원에서 보컬, MR 분리
    def split(self):
        logger.info("Start split vocal & MR")

        audio_path = f"{cover_path}/{userCode}/{coverCode}/origin/{coverCode}.wav"
        # spl = f"python3 -m spleeter separate -p spleeter:2stems -o {path} {audio_path}"
        spl = f"spleeter separate -p spleeter:4stems -o {cover_path}/{userCode} {audio_path}"
        os.system(spl)


    # 음원 추론(목소리 변환)
    def infer(self):
        vocals = f"{cover_path}/{userCode}/{coverCode}/vocals.wav"

        pth = f"{model_path}/{modelCode}/pth.pth"
        index = f"{model_path}/{modelCode}/index.index"
        index = None

        inferred = f"{cover_path}/{userCode}/{coverCode}/inferred.wav"

        logger.info("Start infer")

        inf = mif.infer(f0up_key=pitch,
                        input_path=vocals,
                        index_path=index,
                        f0method="rmvpe",
                        opt_path=inferred,
                        model_path=pth,
                        index_rate=0.6,
                        is_half=True)
        
        inf.run()


    # MR + 변환된 음성 믹싱
    def mixing(self):
        inferred = f"{cover_path}/{userCode}/{coverCode}/inferred.wav"
        bass = f"{cover_path}/{userCode}/{coverCode}/bass.wav"
        drums = f"{cover_path}/{userCode}/{coverCode}/drums.wav"
        other = f"{cover_path}/{userCode}/{coverCode}/other.wav"

        output = f"{cover_path}/{userCode}/{coverCode}/{coverName}.mp3"

        logger.info("Start mixing")

        drums_audio = AudioSegment.from_wav(drums)
        bass_audio = AudioSegment.from_wav(bass)
        other_audio = AudioSegment.from_wav(other)
        infer_audio = AudioSegment.from_wav(inferred)

        if pitch != 0:
            key = pitch
            while key < -8 or key > 8:
                if key < -8:
                    key = key + 12
                elif key > 8:
                    key = key - 12
            
            if key != 0:
                bass_audio = self.pitch_shift(bass_audio, key)
                other_audio = self.pitch_shift(other_audio, key)

        mixed_audio = drums_audio.overlay(bass_audio).overlay(other_audio).overlay(infer_audio)

        logger.info(f"Write result {output}")

        mixed_audio.export(output, format="mp3")

        return output


    ## 피치 조절
    def pitch_shift(self, sound, n_steps):
        y = np.frombuffer(sound._data, dtype=np.int32).astype(np.float64)/2**15
        y = librosa.effects.pitch_shift(y, sound.frame_rate, n_steps=n_steps)
        a = AudioSegment(np.array(y * (1<<15), dtype=np.int32).tobytes(), frame_rate = sound.frame_rate, sample_width=4, channels = 1)
        return a


class TooLongYoutubeException(Exception):
    def __init__(self):
        super().__init__("영상의 길이가 10분 이상입니다.")