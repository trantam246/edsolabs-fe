import styled from 'styled-components/macro';

export const Wrap = styled.div`
  width: auto;
  flex-grow: 1;
  min-height: 100vh;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
`;

export const RunTasked = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 120px;
  border-bottom: 2px solid #000;
  h2 {
    font-size: 35px;
    font-weight: 400;
  }
`;

export const Content = styled.div`
  padding: 30px;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  h3 {
    font-size: 27px;
    font-weight: 400;
  }
`;

export const Item = styled.div`
  width: ${(props) => props.col}%;
  padding-left: 10px;
  padding-right: 10px;
`;
