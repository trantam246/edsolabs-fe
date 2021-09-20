import styled from 'styled-components/macro';

export const ListTasked = styled.div`
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
  svg:last-child {
    cursor: pointer;
  }
`;
export const ContentBox = styled.div`
  padding: 10px 20px 50px 20px;
  background-color: #fff;
  position: relative;
  text-align: center;
  border-radius: 10px;
  & h4 {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  & span {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;
export const GroupBtn = styled.div`
  width: calc(100% + 2px);
  position: absolute;
  left: -1px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
    width: 50%;
    border: 1px solid #000;
    border-bottom-${(props) => props.border}-radius:10px ;
    background-color: #fff;
    padding: 5px;
`;
