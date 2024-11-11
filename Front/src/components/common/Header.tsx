import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Playlist from './playlist/header/Playlist';
import logoimage from '../../assets/logo.png';


const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6.25rem;
  position: relative;
`;

export const Logo = styled.img`
  width: 300px;
  height: auto;
`;

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === '/'; // 메인 페이지의 경로가 '/'인 경우
  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')} src={logoimage}/>
      <Playlist />
    </HeaderContainer>
  );
};

export default Header;

//  {isMainPage ? (
//     <>
//       {/* <Playlist />
//       <Link to="/">
//         <Logo src={logoimage} $isMainPage={isMainPage}></Logo>
//       </Link> */}
//       <Playlist />
//     </>
//   ) : (
//     <>
//       <LogoContainer $isMainPage={isMainPage}>
//         <Link to="/">
//           <Logo src={logoimage} $isMainPage={isMainPage}></Logo>
//         </Link>
//       </LogoContainer>
//       <Playlist />
//     </>
//   )}
