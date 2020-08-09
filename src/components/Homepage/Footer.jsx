import React, { useContext } from 'react';
import styled from '@emotion/styled';
import NotfoundContext from '../../context/NotFound/notfoundContext';

const FooterHTML = styled.footer`
    background-color: #2c3440;
    color: inherit;
    height: 72px;
    display: flex;
    align-items: center;
    font-size: .8rem;
    p{
        text-align: center;
    }
    @media ( min-width: 768px ){
        font-size: 1rem;
    }
`;


const Footer = () => {
    
    const notfoundContext = useContext( NotfoundContext );
    const { notfounditem } = notfoundContext;
    
    if ( notfounditem ) return null;

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