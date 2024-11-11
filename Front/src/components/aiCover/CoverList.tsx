import styled from 'styled-components';
import CoverCard from './CoverCard';
import { Cover } from './CoverInterface';

interface Props {
  data: Cover[];
}

const CardContainer = styled.div`
  width: 19%;
  flex: 0 0 19%;
  height: 350px;
  box-sizing: border-box;
  margin: 0.5%;
`;

const CoverList: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((cover) => (
          <CardContainer key={cover.coverCode}>
            <CoverCard  cover={cover} />
          </CardContainer>
        ))}
    </>
  );
};

export default CoverList;
