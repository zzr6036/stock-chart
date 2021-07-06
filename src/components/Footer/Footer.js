import React from 'react'
import styled from "styled-components"

const FooterWrapper = styled.div`
    width: 100%;
    background-color: #000;
    text-align: center;
    color: #b2b2b2;
    font-size: 12px;
    height: 34px;
    line-height: 34px;
    z-index: 2;
`;

const Footer = props => {
    return (
        <FooterWrapper>
            Stock-Analysis ©2021 Created by M1
        </FooterWrapper>
    )
}

export default Footer