import styled from "styled-components";

export const ButtonIcon = styled.button`
    position:relative;
    background-color:transparent;
    padding:7px 40px 7px 15px;
    border-radius:4px;
    font-size:16px;
    font-weight:400;
    transition: transform .2s ;
    &:hover{
        color:#c9c9c9;
    }
    &:active{
        transform: translateY(1px);
    }
    &:after{
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
    svg{
        position: absolute;
        top:51%;
        right:7px;
        transform: translateY(-50%);
    }
`

export const FlexDateRange = styled.div`
    position: fixed;
    right: 30px;
    top:60%;
    transform: translate(0,-50%);
    z-index: 1;
`