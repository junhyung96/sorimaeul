import { styled } from "styled-components";

const MenuHeader = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const BigText = styled.span`
  font-size: 3.125rem;
  font-family: 'GmarketSansBold';
`;

const MiddleText = styled.span`
  font-size: 2.5rem;
  font-family: 'GmarketSansBold';
  margin-top: 9px;
  margin-right: 1rem;
`;

const SmallText = styled.span`
  margin-top: 12px;
  font-size: 1.25rem;
  font-family: 'GmarketSansLight';
`;

interface Props {
  bigText: string;
  middleText: string;
  smallText: string;
}

const MenuDescription: React.FC<Props> = ({ bigText, middleText, smallText }) => {
  return (
    <MenuHeader>
      <BigText>{bigText}</BigText>
      <MiddleText>{middleText}</MiddleText>
      <SmallText>{smallText}</SmallText>
    </MenuHeader>
  );
}

export default MenuDescription;