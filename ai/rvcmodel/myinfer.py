import os,sys

from infer.modules.vc.modules2 import VC
from scipy.io import wavfile
from configs.config import Config

import logging


logger = logging.getLogger(__name__)

config = Config()
vc = VC(config)


class infer:

    def __init__(self, f0up_key, input_path, index_path, f0method, opt_path, model_path, index_rate, is_half):
        self.f0up_key=f0up_key # 피치
        self.input_path=input_path # 노래 파일 위치
        self.index_path=index_path # 인덱스 파일 위치
        self.f0method=f0method # harvest or pm (알고리즘)
        self.opt_path=opt_path # 출력 파일 위치
        self.model_path=model_path # 모델 위치
        self.index_rate=index_rate # 인덱스 비율
        self.is_half=is_half # True
        self.now_dir=os.getcwd()
        sys.path.append(self.now_dir)
        self.hubert_model=None
        self.cpt=None
        self.tgt_sr=None;

    def run(self):
        vc.get_vc("pth.pth", self.model_path, self.index_path, 0.33, 0.33)

        msg, (tgt_sr, audio_opt) = vc.vc_single(0,
                            self.input_path,
                            self.f0up_key,
                            self.model_path,
                            self.f0method,
                            self.index_path,
                            self.index_path,
                            self.index_rate,
                            3,
                            0,
                            0.25,
                            0.33)

        logger.info(msg)
        logger.info(f"Write file {self.opt_path}")

        wavfile.write(self.opt_path, tgt_sr, audio_opt)

