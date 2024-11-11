import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getModelInfo, updateModel } from "../../../utils/voiceModelAPI";
import { s3URL } from "../../../utils/s3";
import defaultImg from "../../../assets/wave1.png";
import { Button } from "../../common/Button";
import editPhoto from "../../../assets/ImgEditor.png";
import editCancel from "../../../assets/editCancel.png";
import saveImg from "../../../assets/saveImg.png";
import { requestS3 } from "../../../utils/s3";

const Container = styled.div`
  border-radius: 25px;
  background-color: rgba(214, 214, 214, 0.66);
  width: 45%;
  padding: 2rem 1rem;
  backdrop-filter: blur(.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .title {
    font-size: 1.875rem;
    color: white;
    font-family: 'GmarketSansBold';
  }

  .img-box {
    width: 35%;
    height: 0;
    padding-bottom: 35%;
    position: relative;
    border-radius: 50%;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; 
      border-radius: 50%;
    }
    
    .edit-label {
      position: absolute;
      right: 8%;
      bottom: 8%;
      z-index: 1;
      height: 3rem;
      display: none;
      .edit-img {
        height: 80%;
        width: 95%;
      }
    }
    
    .edit-cancel-img {
      position: absolute;
      left: 8%;
      bottom: 8%;
      z-index: 1;
      height: 3rem;
      display: none;
    }

    .save-img {
      position: absolute;
      right: 8%;
      bottom: 8%;
      z-index: 1;
      height: 3rem;
      display: none;
    }
    
    .image-input {
      display: none;
    }

    &:hover .edit-label {
      display: flex;
    }

    &:hover .edit-cancel-img {
      display: flex;
    }

    &:hover .save-img {
      display: flex;
    }

  }

  .name-box {
    height: 2.5rem;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 3.5rem;

    .name {
      font-size: 1.5rem;
      font-family: 'GmarketSansBold';
      padding-top: .3rem;
    }
    .name-input {
      font-size: 1.25rem;
      height: 100%;
      width: 78%;
      padding: 0 .5rem;
      border-radius: 5px;
    }
  }
`

interface ModelData {
  modelName: string;
  imagePath: string;
}

function ModelEditForm() {
  const params = useParams();

  const [modelName, setModelName] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [isNameEdit, setNameIsEdit] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [isImgEdit, setIsImgEdit] = useState(false);

  const getModelData = async () => {
    if (params.code) {
      const res = await getModelInfo(params.code);
      setModelName(res.modelName);
      setImagePath(res.imagePath);
    }
  };

  useEffect(() => {
    getModelData();
  }, [params.code])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(file);
        setSelectedImgUrl((reader.result as string));
      };
      reader.readAsDataURL(file);
    }
    setIsImgEdit(true);
  };

  const cancelEditImg = () => {
    setIsImgEdit(false);
  };

  const saveSelectedImg = async () => {
    if (selectedImg && params.code) {
      try {
        const uploadedImageUrl = await requestS3({
          filename: selectedImg.name.replace(/\.[^/.]+$/, ''),
          file: selectedImg,
        });
        await updateModel(params.code, {
          modelName,
          imagePath: uploadedImageUrl
        })
        setImagePath(uploadedImageUrl);
        setIsImgEdit(false);
        setSelectedImg(null);
        setSelectedImgUrl('');
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const editInfo = async () => {
    if (params.code) {
      setNameIsEdit(false);
      await updateModel(params.code, {
        modelName,
        imagePath
      });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelName(e.target.value);
  };

  return (
    modelName &&
    <Container>
      <h1 className="title">모델 정보 수정</h1>
      <div className="img-box">
        <img className="img" src={ isImgEdit ? selectedImgUrl : imagePath ? s3URL + imagePath : defaultImg} />
        {
          isImgEdit ?
          <>
            <img onClick={cancelEditImg} className="edit-cancel-img" src={editCancel} alt="" />    
            <img onClick={saveSelectedImg} className="save-img" src={saveImg} alt="" />
          </>
          :
          <>
            <label className="edit-label" htmlFor="imageInput"><img className="edit-img" src={editPhoto} /></label>
            <input
              id="imageInput"
              className="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </>
        }

      </div>
      <div className="name-box">
        {
          isNameEdit ? 
          <>
            <input onChange={handleNameChange} className="name-input" type="text" defaultValue={modelName} />
            <Button onClick={editInfo} $marginTop={0} $width={3.5} $height={2.5}>확인</Button>
          </>
          :
          <>
            <p className="name">{modelName}</p>
            <Button onClick={() => setNameIsEdit(true)} $marginLeft={1} $marginTop={0} $width={3} $height={2}>변경</Button>
          </>
        }
      </div>
    </Container>
  )
}

export default ModelEditForm;