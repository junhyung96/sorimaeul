import styled from 'styled-components';
import CDPlayer from "./CDPlayer";
import { Cover } from "./CoverInterface";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;



interface Props {
  data: Cover[];
}
const PopularCoverList: React.FC<Props> = ({
  data
}) => {
  return (
<ListContainer >
      {data && data.map((cover) => (
        <CDPlayer key={cover.coverCode} cover={cover}/>
      ))}
</ListContainer>
  );
};

export default PopularCoverList;