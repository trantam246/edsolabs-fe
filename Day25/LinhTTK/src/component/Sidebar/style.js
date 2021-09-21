import styled from 'styled-components/macro';

export const Sidebar = styled.div`
  background-color: #9c9fa4;
  width: '80px';
  padding: 40px;
  height: 100vh;
`;

export const SidebarHeader = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  color: #fff;
  &::before {
    content: '';
    background-color: #000;
    position: absolute;
    width: '50px';
    height: 2px;
    bottom: -6.2px;
  }
  div {
    border-radius: 50%;
  }
  span {
    display: ${(props) => (props.open ? 'block' : 'none')};
    font-size: 24px;
  }
`;

export const LinkHeader = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  position: relative;
  text-align: start;
  text-decoration: none;
  color: #fff;
`;

export const LinkSidebar = styled.button`
  width: 100%;
  display: inline-block;
  background-color: transparent;
  border: none;
  position: relative;
  padding-left: 70px;
  text-align: start;
  height: 30px;
  text-decoration: none;
  color: #fff;
  &:hover {
    text-decoration: underline;
  }
  svg {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 15px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  span {
    display: ${(props) => (props.open ? 'inline' : 'none')};
    line-height: 30px;
    font-size: 20px;
  }
`;
