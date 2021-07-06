import logo from '../../logo.svg';
import React from 'react'
import styled from "styled-components"


const HeaderWrapper = styled.div`
    width: 100%;
    background-color: #fff;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    height: 50px;
    line-height: 50px;
    display: flex;
`;

const LogoContainer = styled.div`
height: 40vmin;
`;

const Header = props => {
    return (
        <HeaderWrapper>
            <LogoContainer>
                <img src={logo} style={{ width: '50px', height: '50px' }} alt="logo" />
            </LogoContainer>
            Welcome to Stock-Analysis Website
        </HeaderWrapper>
    )
}

export default Header