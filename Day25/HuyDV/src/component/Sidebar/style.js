// import { Link } from "react-router-dom";
import styled from "styled-components";

export const Sidebar = styled.div`
    background-color:#1c1c1c;
    width:${props => props.open ? '300px' : '80px'};
    padding:40px ${props => props.open ? '20px' : '10px'}; 
    height:100vh;
    border: 2px solid #000;
    }

    ul{
        margin-top:30px;
        li{
            padding:15px 10px;  
        }
    }
    
`


export const SidebarHeader = styled.div`
    width:100%;
    display:flex;
    position: relative;
    justify-content:${props => props.open ? 'flex-start' : 'center'};
    gap:${props => props.open ? '20px' : '0px'};
    padding-bottom:${props => props.open ? '0' : '20px'};
    align-items: center;
    color:#fff;
    &::before{
        content:'';
        background-color:#000;
        position: absolute;
        width:calc(100% + ${props => props.open ? '40px' : '20px'});
        height:2px;
        bottom:-6.2px;
        left:${props => props.open ? '-20px' : '-10px'};
        right:${props => props.open ? '-20px' : '-10px'};
    }
    div{
        width:${props => props.open ? '70px' : '50px'};
        height:${props => props.open ? '70px' : '50px'};
        border-radius:50%
    }
    span{
        display:${props => props.open ? 'block' : 'none'};
        font-size:24px;
    }
`

export const LinkHeader = styled.button`
    display:inline-block;
    background-color: transparent;
    border:none;
    position: relative;
    text-align:start;
    text-decoration: none;
    color:#fff;
`


export const LinkSidebar = styled.button`

    width:100%;
    display:inline-block;
    background-color: transparent;
    border:none;
    position: relative;
    padding-left:70px;
    text-align:start;
    height:30px;
    text-decoration: none;
    color:#fff;
    &:hover{
        text-decoration: underline;
    }
    svg{
        position: absolute;
        width:30px;
        height:30px;
        left:15px;
        top:50%;
        transform: translate(-50%,-50%);
    }
    span{
        display:${props => props.open ? 'inline' : 'none'};
        line-height: 30px;
        font-size: 20px;
    }
`
