import { useEffect, useState } from 'react';
import {
  CoverCreateInterface,
  CoverModelInterface,
  SongInterface,
} from './CoverInterface';
import { getCoverModels } from '../../utils/coverAPI';
import { Button } from '../common/Button';
import styled from 'styled-components';
import DirectUpload from './DirectUpload';
import Recommendation from './Recommendation';
import help from '../../assets/help.png';
import Tooltip from '../common/Tooltip';

const Container = styled.form`
  border-radius: 25px;
  background-color: rgba(214, 214, 214, 0.66);
  width: 65%;
  padding: 4rem 1rem;
  backdrop-filter: blur(0.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  .title {
    font-size: 1.875rem;
    color: white;
    font-family: 'GmarketSansBold';
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 65%;

  .subtitle {
    font-size: 1.3rem;
    color: white;
    padding-top: 0.4rem;
    font-family: 'GmarketSansBold';
  }

  .thirdtitle {
    font-size: 1rem;
    color: #757575;
  }
`;

const RadioBox = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RadioGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #757575;
  font-size: 1.24rem;
  gap: 2rem;

  .label {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  outline: none;
  background-color: white;
  color: #9f9f9f;
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  border: 1px solid #ccc;
  height: 2.75rem;
  border-radius: 5px;
  padding: 0 .75rem;
  color: #9f9f9f;
  &:focus {
    border-color: #fe9d6a;
  }
`;

const Option = styled.option`
  border-radius: 5px;
  flex-grow: 1;
  height: 2.75rem;
  padding: 0 1rem;
  outline: none;
  background-color: white;
  color: #9f9f9f;
  display: flex;
  align-items: center;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 10px; /* 요소 사이의 간격 */
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const RangeContainer = styled.div`
  display: fles;
`;

const HelpIcon = styled.img`
  margin-bottom: 0.3rem;
  width: 18px;
  height: 18px;
`;

const ButtonBox = styled.div`
  width: 65%;
  display: flex;
  justify-content: flex-end;
`

interface Props {
  onSubmit: (data: CoverCreateInterface) => void;
}

const CoverForm: React.FC<Props> = ({ onSubmit }) => {
  const [data, setData] = useState<CoverCreateInterface>({
    youtubeLink: '',
    singer: '',
    title: '',
    modelCode: '',
    pitch: 0,
    coverName: '',
  });
  const [models, setModels] = useState<CoverModelInterface>({
    voiceModels: [],
  });
  const [uploadType, setUploadType] = useState<string>('direct');
  const baseStepNumber = uploadType === 'recommendation' ? 1 : 2;
  const [youtubeLink, setYoutubeLink] = useState('');


  useEffect(() => {
    (async () => {
      try {
        const modelData = await getCoverModels();
        setModels(modelData);
      } catch (err) {
        console.error('음성 모델 데이터를 가져오는데 실패했습니다.');
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUploadType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUploadType = e.target.value;
    setUploadType(newUploadType);

    setData({
      ...data,
      youtubeLink: '',
      singer: '',
      title: '',
      coverName: '',
    });

    if (newUploadType === 'direct') {
      setYoutubeLink('');
    }
  };

  const handleDirectLink = (link: string) => {
    setData((prevData) => ({
      ...prevData,
      youtubeLink: link,
    }));
    setYoutubeLink(link);
  };

  const handleSongSelect = (song: SongInterface) => {
    const { coverSourceCode, singer, title, youtubeLink, thumbnailPath } = song;
    setData((prevData) => ({
      ...prevData,
      singer: singer,
      title: title,
      youtubeLink: youtubeLink,
    }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  // 유튜브 유효성 검사
  const isValidYoutubeLink = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  return (
    <Container onSubmit={submitHandler}>
      <h2 className="title">AI 커버 만들기</h2>
      <hr className="w-5/6" />
      <Step>
        <h3 className="subtitle">Step 1. 노래 업로드</h3>
      </Step>

      <RadioBox>
        <RadioGroup>
          <div className="flex gap-2">
            <label>
              <input
                type="radio"
                name="uploadType"
                value="direct"
                checked={uploadType === 'direct'}
                onChange={handleUploadType}
              />
            </label>
            <span>직접 유튜브 링크 입력</span>
          </div>

          <div className="flex gap-2">
            <label>
              <input
                type="radio"
                name="uploadType"
                value="recommendation"
                checked={uploadType === 'recommendation'}
                onChange={handleUploadType}
              />
            </label>
            <span>추천 목록에서 선택</span>
          </div>
        </RadioGroup>
      </RadioBox>

      {uploadType === 'direct' && (
        <>
          <DirectUpload link={youtubeLink} onLinkChange={handleDirectLink} />
          <Step>
            <h3 className="subtitle">Step 2. 원곡 정보 입력</h3>
            <div>
              <label htmlFor="singer" className="thirdtitle">
                원곡 가수명
              </label>
              <Input
                type="text"
                id="singer"
                name="singer"
                value={data.singer}
                onChange={handleChange}
                placeholder="원곡 가수명을 입력해주세요."
              />
              <label htmlFor="title" className="thirdtitle">
                원곡 제목
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="원곡 제목을 입력해주세요."
              />
            </div>
          </Step>
        </>
      )}
      {uploadType === 'recommendation' && (
        <Recommendation onSongSelect={handleSongSelect} />
      )}

      <Step>
        <h3 className="subtitle">Step {baseStepNumber + 1}. 모델 선택하기</h3>

        <label className="thirdtitle" htmlFor="modelCode">
          원하는 음성 모델을 선택하고, 알맞게 피치를 조절해주세요.
        </label>
        <Select
          name="modelCode"
          id="modelCode"
          value={data.modelCode}
          onChange={handleChange}
        >
          <Option value=""> 모델을 선택해주세요. </Option>
          {models &&
            models?.voiceModels.map((model) => (
              <Option key={model.modelCode} value={model.modelCode}>
                {model.modelName}
              </Option>
            ))}
        </Select>
        <StepContainer>
        <label className="text-stone-500" htmlFor="pitch">피치 조절 
        </label>
        {data.pitch}
        <Tooltip message={"남성과 여성은 일반적으로 4 ~ 6키가 차이납니다. 예를 들어 남성 음성으로 여성곡을 커버하시려는 경우,  -4 ~ -6사이의 피치 조절을 추천드립니다."}>
        <HelpIcon src={help} />
        </Tooltip>
        
        </StepContainer>

        <input
          type="range"
          id="pitch"
          name="pitch"
          value={data.pitch}
          min={-12}
          max={12}
          step={1}
          list="markers"
          onChange={handleChange}
        />
        <datalist className="datalist" id="markers">
          <option value="-12"/>
          <option value="-11"/>
          <option value="-10" />
          <option value="-9" />
          <option value="-8" />
          <option value="-7" />
          <option value="-6"/>
          <option value="-5" />
          <option value="-4" />
          <option value="-3" />
          <option value="-2" />
          <option value="-1" />
          <option value="0" />
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
          <option value="6" />
          <option value="7" />
          <option value="8" />
          <option value="9" />
          <option value="10" />
          <option value="11" />
          <option value="12" />
        </datalist>
      </Step>

      <Step>
        <h3 className="subtitle">
          Step {baseStepNumber + 2}. 커버 이름 정하기
        </h3>
        <Input
          type="text"
          id="coverName"
          name="coverName"
          value={data.coverName}
          onChange={handleChange}
          placeholder="커버 이름을 입력해주세요."
        />
      </Step>

      <ButtonBox>
        <Button
          $marginTop={1}
          $color="#FE9D6A"
          $width={10}
          $height={3}
          type="submit"
          disabled={
            !isValidYoutubeLink(data.youtubeLink) ||
            !data.youtubeLink ||
            !data.singer ||
            !data.title ||
            data.modelCode === '' ||
            !data.coverName
          }
        >
          변환하기
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default CoverForm;
