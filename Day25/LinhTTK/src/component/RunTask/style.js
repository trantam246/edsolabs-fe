import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
  TextField: {
    flexGrow: 1,
    width: 'auto',
    '& .MuiInputBase-root': {
      fontSize: '35px',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 'none',
    },
    '& .MuiInput-underline:before': {
      content: 'none',
    },
    '& .MuiInput-underline:after': {
      content: 'none',
    },
  },

  tag: {
    width: '35px',
    height: '35px',
    cursor: 'pointer',
  },
  count: {
    fontSize: '25px',
    fontWeight: 600,
  },
  listDown: {
    backgroundColor: '#fff',
    border: '1px solid #000',
  },
  icon: {
    padding: '2px 10px',
  },
}));

export const RunTasked = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  border-bottom: 2px solid #000;
`;
export const GroupItem = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
`;
