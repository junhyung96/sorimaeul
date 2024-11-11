import styled from 'styled-components';
import HeaderPlayer from '../../../audioPlayer/HeaderPlayer';



const HeaderPlayerContainer = styled.div`
  width: 25%;
  position: absolute;
  right: 1rem;
  height: 100%;
  top: 25%;
`;


const Playlist: React.FC = () => {
  return (
    <>
      <HeaderPlayerContainer>
        <HeaderPlayer/>
      </HeaderPlayerContainer>
    </>
  );
};

export default Playlist;