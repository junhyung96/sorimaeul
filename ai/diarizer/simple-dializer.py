from simple_diarizer.diarizer import Diarizer
from simple_diarizer.utils import (check_wav_16khz_mono, convert_wavfile,
                                   waveplot, combined_waveplot, waveplot_perspeaker)

import os
import tempfile
import librosa

from pprint import pprint

import matplotlib.pyplot as plt
import soundfile as sf

from IPython.display import Audio, display, HTML
from tqdm.autonotebook import tqdm

print("Start simple-dializer")

audio_path = "lily.wav"
NUM_SPEAKERS = 3 # The number of speakers

name = audio_path[:-4]

spl = r'spleeter separate -p spleeter:2stems -o output ' + audio_path

os.system(spl)

re_audio_path = f"output\\{name}\\vocals.wav"

with tempfile.TemporaryDirectory() as outdir:
    voice = re_audio_path

    wav_file = convert_wavfile(voice, f"{outdir}\\{name}_converted.wav")
    # signal, fs = sf.read(wav_file)

    print(f"wav file: {wav_file}")

    diar = Diarizer(
        embed_model='xvec', # supported types: ['xvec', 'ecapa']
        cluster_method='sc', # supported types: ['ahc', 'sc']
        window=1.5, # size of window to extract embeddings (in seconds)
        period=0.75 # hop of window (in seconds)
    )

    # If using NUM_SPEAKERS
    segments = diar.diarize(wav_file,
                            num_speakers=NUM_SPEAKERS,
                            outfile=f"{outdir}\\{name}.rttm"
    )

sample_rate = 16000
mono = True

y, sr = librosa.load(re_audio_path, sr=sample_rate)

duration = librosa.get_duration(y=y, sr=sample_rate)
print(f"Audio Duration: {duration}")

for i in range(0, NUM_SPEAKERS):
    ny = [0.0 for j in range(round(sr*duration))]

    for seg in segments:
        if seg['label'] == i:
            # start = round(seg['start'] * sr)
            # end = round(seg['end'] * sr)
            start = seg['start_sample']
            end = seg['end_sample']
            for j in range(start, end):
                ny[j] = y[j]

    sf.write(f"{name}_label{i}.wav", ny, sr, format='WAV')

# waveplot(signal, fs, figsize=(20,3))
# plt.show()

# combined_waveplot(signal, fs, segments, figsize=(10,3), tick_interval=60)
# plt.show()