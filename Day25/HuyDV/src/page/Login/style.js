import styled from "styled-components";
import bgImg from '../../public/assets/image/bg-img.jpg';

export const Wrap = styled.div`
    width:100%;
    height:100vh;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image:url(${bgImg});
`
export const Container = styled.div`
    width:100%;
    height:100%;
    background-color: rgba(0, 0, 0, .8);
    padding-left:20px;
    padding-right:20px;
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
    
`
export const TitleHeading = styled.h2`
    padding:20px 10px 20px 10px;
    text-align:center;
    font-size:40px;
    letter-spacing: 3px;
    color:#FFF;
    font-weight: 600;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, .5);
`

export const WrapForm = styled.div`
    max-width:1000px;
    width:100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-image:url(${bgImg});
    box-shadow:0px 0px 100px  rgba(0,0,0,.7);
`

export const Row = styled.div`
    background-color: rgba(0, 0, 0, .7);
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    align-items: center;
`
export const Item = styled.div`
    background: ${props => props.bgColor ? 'white' : 'transparent'};
    width:50%;
    padding:30px;
    h3,p{
        text-align:center;
        color:#fff;
    }
    h3{
        font-size:35px;
    }
    p{
        font-size:20px;
    }
    @media screen and (max-width:768px) {
        width:100%;
    }
`
