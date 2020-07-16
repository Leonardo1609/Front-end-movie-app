import React from 'react';
import styled from '@emotion/styled';

const FooterHTML = styled.footer`
    background-color: #2c3440;
    color: inherit;
    height: 72px;
    display: flex;
    align-items: center;
`;

const Footer = () => {
    return ( 
        <FooterHTML>
            <div className = "container">
                <p>
                    © MovieApp Limited. Made by fan in Perú, Lima. Film data from TMDb. Inspired in Letterbox.
                </p>
            </div>
        </FooterHTML>
    );
}
 
export default Footer;