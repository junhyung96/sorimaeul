import styled from "styled-components";
import uploadFile from "../../../assets/uploadFile.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileUploaded, setIsStart, setIsLearning } from "../../../stores/voiceModel";
import { RootState } from "../../../stores/store";
import { uploadExVoiceFiles, startModelLearning } from "../../../utils/voiceModelAPI";

const Container = styled.div<{ $isUploaded: boolean }>`
  width: 100%;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .guide {
    font-size: 0.875rem;
  }
  .file-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 8.5rem;
    background-color: #8F8F8F;
    gap: 1rem;
    position: relative;

    .name {
      font-size: .875rem;
      font-family: 'GmarketSansLight';
    }

    .delete-btn {
      cursor: pointer;
    }

    label {
      cursor: pointer;
      width: 100%;
      height: ${(props) => props.$isUploaded ? '75%' : '100%'};
      position: absolute;
    }
  
    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }

  }
`

function UploadRecordMethod() {
  const dispatch = useDispatch();
  const isStart = useSelector((state: RootState) => state.voiceModel.isStart);
  const modelCode = useSelector((state: RootState) => state.voiceModel.modelCode);
  const [files, setFiles] = useState<FormData>(new FormData());

  const getFormDataSize = (formData: FormData) => [...formData].reduce((size, el) => size + 1, 0);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFiles = Array.from(e.target.files);
      setFiles((prevFiles) => {
        const formData = new FormData();
        for (const value of prevFiles.values()) {
          formData.append("files", value);
        }
        for (let i = 0; i < uploadFiles.length; i++) {
          formData.append("files", uploadFiles[i]);
        }
        return formData
      });
    }
  }

  const deleteFile = (idx: number) => {
    setFiles((pre) => {
      const formData = new FormData();
      let i = 0;
      for (const value of pre.values()) {
        if (i !== idx) {
          formData.append("files", value);
        }
        i += 1
      }
      return formData;
    })
  };

  useEffect(() => {
    if (getFormDataSize(files)) {
      dispatch(setIsFileUploaded(true));
    } else {
      dispatch(setIsFileUploaded(false));
    }
  }, [files])

  const startLearning = async () => {
    const res = await uploadExVoiceFiles(modelCode, files);
    if (res?.status === 200) {
      await startModelLearning(modelCode);

      dispatch(setIsLearning(2));
      dispatch(setIsStart(false));
    }
  }

  useEffect(() => {
    if (isStart) {
      startLearning();
    }
  }, [isStart])

  return(
    <Container $isUploaded={getFormDataSize(files) > 0}>
      <div className="guide">
        <p>이미 녹음된 음성 파일을 모델 학습에 이용합니다.</p>
        <p>10분 이상의 분량이 권장됩니다.</p>
        <p>(목소리를 제외한 잡은 및 공백이 없어야 학습에 용이합니다.)</p>
      </div>
      <div className="file-controller">
        {
          getFormDataSize(files) > 0 ?
          <div className="w-full h-full flex flex-col p-4 gap-2">
            <div className="flex flex-col h-3/4 overflow-auto gap-2">
              {
                [...files.values()].map((el, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {
                      el instanceof File &&
                      <p className="name">{el.name}</p>
                    }
                    <p className="delete-btn" onClick={() => deleteFile(idx)}>x</p>
                  </div>
                ))
              }
            </div>
            <div>
              <label htmlFor="files">+ 파일 추가</label>
              <input onChange={handleFiles} type="file" id="files" name="files" accept=".wav, .mp3, .m4a" multiple />
            </div>
          </div>
          :
          <>
            <img src={uploadFile} alt="uploadFile" />
            <p>wav 파일이 권장됩니다.</p>
            <label htmlFor="files"></label>
            <input onChange={handleFiles} type="file" id="files" name="files" accept=".wav, .mp3, .m4a" multiple />
          </>
        }
      </div>
    </Container>
  )
}

export default UploadRecordMethod;