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

export const Content = styled.div`
  padding: 30px;
`;

export const ListTaskDate = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  column-gap: 50px;
  justify-content: center;
  align-items: flex-start;
  h2 {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 23px;
  }
`;

export const ListTask = styled.div`
  padding: 10px 15px;
  border: 1px solid #000;
  border-bottom: none;
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  &:last-child {
    border-bottom: 1px solid #000;
  }
  h3 {
    flex-grow: 1;
  }
`;

export const ListItem = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

export const WrapButton = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
