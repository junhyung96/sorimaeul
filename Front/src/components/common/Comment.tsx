import { useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { s3URL } from "../../utils/s3";
import deleteIcon from "../../assets/deleteIcon.png";
import { createCoverComment, createDubComment, deleteComment } from "../../utils/commentAPI";
import { addComment, removeComment } from "../../stores/comment";
import defaultProfile from "../../assets/profile.png";


const CommentContainer = styled.div<{ $width?: number; }>`
  width: ${(props) => props.$width ? `${props.$width}%` : '75%'};
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 1rem;
  margin: 2rem auto;

  .title {
    font-size: 2.2rem;
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center; 
  gap: 8px;
`;


const CommentInputSection = styled.div`
  display: flex;
  gap: 10px;
`;

const InputBox = styled.input`
  width: 80%;
  background: #FFFFFF;
  border: 1px solid #CECECE;
  border-radius: 5px;
  flex-grow: 1;
  margin-right: 10px;
  height: 40px;
  padding: 0 .5rem;
`;

const Form = styled.form`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 5px;
`
interface LineInterface {
  $color?: string;
  $height?: number;
}

const Line = styled.div<LineInterface>`
  height: ${(props) => (props.$height ? `${props.$height}rem` : "0.01rem")};;
  background-color: ${(props) => props.$color || "#000000"};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CommentList = styled.div`
  // 댓글 리스트 스타일
`;

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
  padding: 10px; 
  border-radius: 5px;
  background-color: #F9F9F9; 
  margin-bottom: 10px; 
`;

const CommentContent = styled.p`
  margin: 0;
  font-family: GmarketSansLight;
`;



const CommentComponent: React.FC<{ width?: number }> = ({width}) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const logginedUserImg = useSelector((state: RootState) => state.user.profileImage);
  const logginedUser = useSelector((state: RootState) => state.user.nickname);
  const { category, selectedPostId, comments } = useSelector((state: RootState) => state.comment);

  const deleteCommentFromPost = async (commentCode: string) => {
    const res = await deleteComment(commentCode);
    if (res === "댓글 삭제 성공!") {
      dispatch(removeComment(commentCode));
    }
  }

  const handleComment = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewComment(e.target.value);
  }

  const submitHandler =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const data = { content: newComment };
    if (selectedPostId && category === "cover") {
      const res = await createCoverComment(selectedPostId, data);
      dispatch(addComment(res));
    } else if (selectedPostId && category === "dub") {
      const res = await createDubComment(selectedPostId, data);
      dispatch(addComment(res));
    }

    setNewComment("");
  }


  return (
    <CommentContainer $width={width}>
      <TitleSection>
        <h2 className="title">댓글</h2>
        <span className="text-orange-400 pt-2">{comments?.length || 0}개</span>
      </TitleSection>
      <CommentInputSection>
        <div className="rounded-full w-10 h-10 mr-4 overflow-hidden">
          <img src={logginedUserImg ? s3URL + logginedUserImg : defaultProfile} className="w-full h-full" alt="Current User ProfileImage" />
        </div>
        <Form onSubmit={submitHandler}>
          <InputBox
            type="text"
            value={newComment}
            onChange={handleComment}
            placeholder="댓글을 입력하세요"
          />
          <Button type="submit" $width={5} $height={2.5} $marginTop={0} $marginLeft={0} disabled={!newComment}>등록</Button>
        </Form>
      </CommentInputSection>
      <Line $color="#FDA06C" />
      <CommentList>
        
        {comments && comments.map(({ commentCode, nickname, profileImage, content, time }) => (
          <CommentItem key={commentCode}>
            <div className="rounded-full w-10 h-10 mr-4 overflow-hidden">
              <img src={profileImage ? s3URL + profileImage : defaultProfile} className="w-full h-full" alt={nickname} />
            </div>
            <div style={{ flexGrow: 1 }}>
              <span>{nickname} <span className="text-stone-300 text-xs">{time}</span></span>
              <CommentContent>{content}</CommentContent>
            </div>
            { logginedUser === nickname &&
             <button className="text-stone-400 flex items-center text-sm pb-3 pr-4"
             onClick={() => deleteCommentFromPost(commentCode)}>
              <span className="pb-0">삭제</span>
             <img src={deleteIcon} alt="Delete Icon" className="pb-1 ml-2"/>
             </button>
             }
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentComponent;