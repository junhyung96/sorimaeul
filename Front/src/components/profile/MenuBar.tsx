import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedMenu } from "../../stores/menu";
import { RootState } from "../../stores/store";

const MenuBarContainer = styled.div`
  
  width: 100%;
  background-color: #ffffff;
  padding: 10px 0;
  border: 1px solid #000000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface MenuItemProps {
  $isSelected: boolean;
}


const MenuItem = styled.div<MenuItemProps>`
  cursor: pointer;
  padding: 10px 20px;
  color: ${(props) => (props.$isSelected ? "#000000" : "#888888")};
  font-size: 20px;
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  position: relative;

  &:hover {

    color: #BFFF0A;
  
    &::after {
      content: ''; 
      position: absolute; 
      bottom: 0; 
      left: 50%;
      transform: translateX(-50%);
      width: 150px; 
      height: 0px;
      border: 1px dashed;
      background-color: #BFFF0A; 
    }
  }
`;

function MenuBar() {
  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
  const dispatch = useDispatch();
  const menus = ["나의 음성 모델", "더빙 컨텐츠", "AI 커버", "관심 컨텐츠", "플레이리스트"];


  return (
    <MenuBarContainer>
      {menus.map((menu) => (
        <MenuItem
          key={menu}
          onClick={() => dispatch(setSelectedMenu(menu))}
          $isSelected={menu === selectedMenu}
        >
          {menu}
        </MenuItem>
      ))}
    </MenuBarContainer>
  );

}

export default MenuBar;