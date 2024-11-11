import styled from "styled-components";
import uploadFile from "../../../assets/uploadFile.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileUploaded, setIsLearning, setIsStart } from "../../../stores/voiceModel";
import { RootState } from "../../../stores/store";
import { startModelLearning, uploadExModelFile } from "../../../utils/voiceModelAPI";

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
    width: 49%;
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

function UploadModelMethod() {
  const dispatch = useDispatch();
  const isStart = useSelector((state: RootState) => state.voiceModel.isStart);
  const modelCode = useSelector((state: RootState) => state.voiceModel.modelCode);
  const [file, setFile] = useState<FormData>(new FormData());
  const [idxFile, setIdxFile] = useState<File | null>(null);

  const getFormDataSize = (formData: FormData) => [...formData].reduce((size, el) => size + 1, 0);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(() => {
        const formData = new FormData();
        formData.append("modelFiles", uploadFile);
        return formData
      });
    }
  }

  const handleIdxFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setIdxFile(uploadFile);
    }
  };

  const deleteFile = () => {
    setFile(() => new FormData())
  };

  const deleteIdxFile = () => {
    setIdxFile(null);
  };

  useEffect(() => {
    if (getFormDataSize(file)) {
      dispatch(setIsFileUploaded(true));
    } else {
      dispatch(setIsFileUploaded(false));
    }
  }, [file])

  const startLearning = async () => {
    const res = await uploadExModelFile(modelCode, file);
    if (res?.status === 200) {
      dispatch(setIsStart(false));
      dispatch(setIsLearning(3));
    }
  }

  useEffect(() => {
    if (isStart) {
      startLearning();
    }
  }, [isStart])

  return(
    <Container $isUploaded={getFormDataSize(file) > 0}>
      <div className="guide">
        <p>외부 학습 모델을 등록합니다.</p>
      </div>
      <div className="flex justify-between">
        <div className="file-controller">
          {
            getFormDataSize(file) > 0 ?
            <div className="w-full h-full flex flex-col p-4 gap-2">
              <div className="flex flex-col overflow-auto gap-2">
                {
                  [...file.values()].map((el, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {
                        el instanceof File &&
                        <p className="name">{el.name}</p>
                      }
                      <p className="delete-btn" onClick={deleteFile}>x</p>
                    </div>
                  ))
                }
              </div>
            </div>
            :
            <>
              <img src={uploadFile} alt="uploadFile" />
              <p>.pth 파일</p>
              <label htmlFor="files"></label>
              <input onChange={handleFiles} type="file" id="files" name="files" accept=".pth" />
            </>
          }
        </div>
        <div className="file-controller">
          {
            idxFile ?
            <div className="w-full h-full flex flex-col p-4 gap-2">
              <div className="flex flex-col overflow-auto gap-2">
                <div className="flex items-center gap-2">
                  <p className="name">{idxFile.name}</p>
                  <p className="delete-btn" onClick={deleteIdxFile}>x</p>
                    </div>
              </div>
            </div>
            :
            <>
              <img src={uploadFile} alt="uploadFile" />
              <p>.idx 파일</p>
              <label htmlFor="files"></label>
              <input onChange={handleIdxFile} type="file" id="files" name="files" accept=".index" />
            </>
          }
        </div>
      </div>
    </Container>
  )
}

export default UploadModelMethod;