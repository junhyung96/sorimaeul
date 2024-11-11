import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #ccc; /* 기본 테두리 색상 */
  border-radius: 5px;
  width: 65%;
  height: 2.75rem;
  padding: 0 1rem;
  outline: none;
  background-color: white;
  color: #9F9F9F;
  display: flex;
  &:focus {
    border-color: #FE9D6B; /* 포커스 시 테두리 색상 */
  }
`;

interface DirectUploadProps {
  link: string;
  onLinkChange: (link: string) => void;
}

function DirectUpload({ link, onLinkChange }: DirectUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onLinkChange(e.target.value);
  };

  return (
    <>

          <Input
      type="text"
      value={link}
      onChange={handleChange}
      placeholder="YouTube 링크를 입력해주세요."
    />

        
    </>
  );
}

export default DirectUpload;