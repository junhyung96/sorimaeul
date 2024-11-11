from pyannote.audio import Pipeline
  
pipeline = Pipeline.from_pretrained(
    "",
    use_auth_token="")

import torch
pipeline.to(torch.device("cuda"))

audio_path = "lily.wav"

import scipy.io as sio

sample_rate, data = sio.wavfile.read(audio_path)

print(f"sample_rate: {sample_rate}")

name = audio_path[:-4]

# inference on the whole file
diarization = pipeline(audio_path)

import librosa
import soundfile as sf

y, sr = librosa.load(audio_path, sr=sample_rate)

print(f"size: {y.size}")

duration = librosa.get_duration(y=y, sr=sample_rate)
print(f"Audio Duration: {duration}")

NUM_SPEAKERS = 0

arr = []

for turn, _, speaker in diarization.itertracks(yield_label=True):
    # print(f"start={turn.start}s stop={turn.end}s speaker_{speaker}")
    start = round(turn.start * sr)
    end = round(turn.end * sr)
    spe = int(speaker[8:])
    arr.append([start, end, spe])
    if int(speaker[8:]) > NUM_SPEAKERS:
        NUM_SPEAKERS = int(speaker[8:])

size = round(duration * sr)

for i in range(0, NUM_SPEAKERS + 1):
    # print(f"speaker: {i}")
    ny = [0.0 for j in range(size)]

    for k in arr:
        if k[2] == i:
            # print(k[0], k[1], k[2])
            for j in range(k[0], min(k[1], size)):
                ny[j] = y[j]

    sf.write(f"{name}_label_{i}.wav", ny, sr, format='wav')

# # inference on an excerpt
# from pyannote.core import Segment
# excerpt = Segment(start=2.0, end=5.0)

# from pyannote.audio import Audio
# waveform, sample_rate = Audio().crop("file.wav", excerpt)
# pipeline({"waveform": waveform, "sample_rate": sample_rate})