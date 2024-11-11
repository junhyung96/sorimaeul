import ColorLine from "../../components/inquiry/ColorLine";
import styled from "styled-components";
import { useEffect, useState } from "react";
import closeBtn from '../../assets/closeBtn.png';
import openBtn from '../../assets/openBtn.png';
import { useNavigate } from "react-router-dom";
import SubTitle from "../../components/inquiry/SubTitle";
import { getFAQ } from "../../utils/inquiryAPI";


const Question = styled.p`
  font-size: 2rem;
`

const Answer = styled.p`
  font-size: 1.125rem;
  white-space: pre-wrap;
  margin-left: 3rem;
`

interface questionData {
  title: string;
  content: string;
  isOpen?: boolean;
}

function FAQPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<questionData[]>([]);

  const getRequestList = async () => {
    const res = await getFAQ();
    setQuestions(res.requests);
  }

  useEffect(() => {
    getRequestList();
    setQuestions(questions.map(question => {
      const q = question;
      q.isOpen = false;
      return q;
    }));
  }, [])

  return (
    <>
      <ColorLine />
      <div className="mx-auto w-9/12 flex flex-col gap-8 pt-4 pb-8">
        <div className="flex gap-4 items-center">
          <SubTitle>
            <span className="lg-font">자</span>주 묻는 질문 FAQ
          </SubTitle>
          <SubTitle><span className="disabled" onClick={() => navigate('/request')}>| 요청 게시판</span></SubTitle>
        </div>
        <div className="flex flex-col gap-6">
          {
            questions.map((question, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex gap-2 justify-between items-center">
                  <Question>Q. {question.title}</Question>
                  {question.isOpen ? <button onClick={() => setQuestions(pre => {
                    const newState = [...pre];
                    newState[idx].isOpen = false;
                    return newState
                  })}><img src={closeBtn} /></button>
                  : 
                  <button onClick={() => setQuestions(pre => {
                    const newState = [...pre];
                    newState[idx].isOpen = true;
                    return newState
                  })}><img src={openBtn} /></button>}
                </div>
                {question.isOpen && <Answer>{question.content}</Answer>}
                {idx !== questions.length - 1 && <hr />}
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default FAQPage;