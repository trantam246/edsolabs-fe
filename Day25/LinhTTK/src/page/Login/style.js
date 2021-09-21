import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';

export const boder = {
  width: '500px',
  margin: 'auto',
  marginTop: '200px',
  border: '3px solid #282c34',
};

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleHeading = styled.h2`
  padding: 20px 10px 20px 10px;
  text-align: center;
  font-size: 40px;
  letter-spacing: 3px;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
`;

export const WrapForm = styled.div`
  max-width: 1000px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
export const Item = styled.div`
  background: ${(props) => (props.bgColor ? 'white' : 'transparent')};
  width: 50%;
  padding: 30px;
  h3,
  p {
    text-align: center;
    color: #fff;
  }
  h3 {
    font-size: 35px;
  }
  p {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const UseStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    '& .MuiTextField-root': {
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: '20px',
      '& span': {
        color: 'black',
        fontSize: '16px',
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
    '& label.Mui-focused': {
      color: 'black',
      fontSize: '20px',
    },

    '& .MuiInputBase-root': {
      backgroundColor: '#fff',
      width: '100%',
    },
  },
  formControl: {
    marginBottom: '30px',
  },
  btnRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));
