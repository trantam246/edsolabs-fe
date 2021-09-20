import styled from 'styled-components/macro';

export const Header = styled.div`
  font-size: 40px;
  font-family: Glory;
  font-weight: 600;
  font-size: 45px;
  border-bottom: 4px solid #333;
  height: 100px;
  line-height: 100px;
`;
export const BodyChart = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const ChartColumn = styled.div`
  width: 400px;
`;

export const Subheader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Boxoptions = styled.div``;
export const Subtext = styled.div`
  font-family: Glory;
  font-size: 40px;
  font-weight: 600;
  margin: 40px 0 60px 40px;
`;
export const ChartPie = styled.div`
  width: 400px;
`;
export const BoxChart = styled.div``;
export const ButtonIcon = styled.button`
  position: relative;
  background-color: transparent;
  padding: 7px 40px 7px 15px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  transition: transform 0.2s;
  &:hover {
    color: #c9c9c9;
  }
  &:active {
    transform: translateY(1px);
  }
  &:after {
    content: '';
    width: 2px;
    height: 100%;
    top: 0;
    right: 28.5px;
    position: absolute;
    background-color: rgb(118, 118, 118);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  svg {
    position: absolute;
    top: 51%;
    right: 7px;
    transform: translateY(-50%);
  }
`;
