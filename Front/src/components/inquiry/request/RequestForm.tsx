import styled from "styled-components";
import { Button } from "../../common/Button";
import { useEffect, useState } from "react";
import { createRequest, editRequest } from "../../../utils/inquiryAPI";
import { useNavigate, useParams } from "react-router-dom";
import { getRequestDetail } from "../../../utils/inquiryAPI";

const Form = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin: 2rem auto;

  .label {
    width: 100%;
    font-size: 1.25rem;
  }

  .content {
    width: 100%;
    border: 1px solid #A3A3A3;
    border-radius: 10px;
  }

  .input {
    height: 2.5rem;
    padding: 0 1rem;
  }

  .textarea {
    resize: none;
    padding: 1rem;
  }

  .button-box {
    display: flex;
    gap: .5rem;
    margin-left: auto;
  }
`

const RequestForm: React.FC<{ isEdit: boolean }> = ({isEdit}) => {
  const navigate = useNavigate();
  const params = useParams();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async () => {
    if (title !== '' && content !== '') {
      if (isEdit && params.id) {
        await editRequest(params.id, {title, content});
        navigate(`/request/${params.id}`);
      } else {
        const res = await createRequest({title, content});
        navigate(`/request/${res?.data.boardCode}`);
      }
    } else {
      alert('제목과 내용을 입력해주세요.');
    }
  };

  const getDetail = async () => {
    if (params.id) {
      const res = await getRequestDetail(params.id);
      setTitle(res.title);
      setContent(res.content);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getDetail();
    }
  }, [params.id])

  return (
    <Form onSubmit={submitHandler}>
      <label className="label" htmlFor="title" id="title">제목</label>
      <input onChange={handleTitle} className="content input" type="text" name="title" defaultValue={title} />
      <label className="label" htmlFor="content" id="content">내용</label>
      <textarea onChange={handleContent} className="content textarea" wrap="hard" name="content" id="" cols={30} rows={10} defaultValue={content}></textarea>
      <div className="button-box">
        <Button onClick={() => window.history.back()} $marginLeft={0} $marginTop={0} $height={2} $width={4.375}>취소</Button>
        <Button onClick={onSubmit} $marginLeft={0} $marginTop={0} $height={2} $width={4.375} $background="#28BEFF">{ isEdit ? "수정" : "작성" }</Button>
      </div>
    </Form>
  )
}

export default RequestForm;