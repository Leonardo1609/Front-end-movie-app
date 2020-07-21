import styled from '@emotion/styled';

/* Styled components of Film & Show pages */ 

export const Image = styled.img`
    width: 250px;
    height: 380px;
    background: #222831;
    grid-row: 1/2;
    margin: 0 calc( 50% - 115px );
    @media ( min-width: 768px ){
        width: 230px;
        height: 345px;
        grid-column: 1/2;
        grid-row: 1/3;
    }
`;

export const ItemContainer = styled.div`

    .body-item {
        padding: 4rem 2rem;
        display: grid;
        justify-content: center;
        grid-template-columns: 100%;
        grid-template-rows: repeat( 4, auto );
        grid-row-gap: 2rem;

        @media ( min-width : 768px){
            padding: 4rem 0rem;
            grid-template-columns: 1fr 2fr 1.2fr;
            grid-template-rows: auto auto;
            grid-gap: 0 1rem;
        }

        .overview{
            
            grid-row: 2/3;
            @media ( min-width: 768px ){
                grid-column: 2/3;
                grid-row: 1/2;                
            }

            h2{
                margin: unset;
                font-size: 2rem;
                
                span{
                    font-weight: 700;
                }
            }
            .directed{
                font-size: 1.1 rem; 
                span{
                    border-bottom: 1px solid #D8E0E8;
                }
            }
            .tagline{
                text-transform: uppercase;
                font-size: .9rem;
                letter-spacing: 0.10rem;
            }

            .overview-content {
                line-height: 1.5;
                font-size: 0.95rem;
            }

            .release-date{
                span{
                    font-weight: bold;
                }
            }
        }
        .rate{
            grid-row: 3/4;
            @media ( min-width: 768px ){
                grid-column: 3/4;
                grid-row: 1/3;
            }

            button{
                padding: 1rem;
                background: #456;
                border-radius: 8px;
                cursor: pointer;
                outline: none;
                border: none;
                color: inherit;
            }
        }
    }
`;

/* Styled components of Details */ 
export const Details = styled.div`

`;

/* Styled components of Description Item */ 

export const Tooltip = styled.div`
    margin-top: 8px;
    
    .tooltip{
        display: inline-block;
        margin-right: 5px;
        border-radius: 3px;
        font-size: .8rem;
        text-decoration: none;
        background: #283038;
        color: #9ab;
        padding: 3px 6px;
        white-space: nowrap;
        margin-top: 8px;
    }          
`;

export const DescriptionBody = styled.div`

    grid-row: 4/5;
    @media ( min-width: 768px ){
        grid-column: 2/3;
        grid-row: 2/3;
    }

    .list-container{
        border-bottom: 1px solid #D8D8D8;
        vertical-align: baseline;
        ul{
            display: block;
            padding: unset;
            list-style: none;
            display: flex;
            margin-bottom: -1px;
            outline: 0;
            overflow: hidden;
            li{
                margin-top: 1px;
                margin-right: 1rem;
                font-size: .85rem;
                letter-spacing: .075em;
                line-height: 1;
                text-transform: uppercase;
                border-bottom: 1px solid transparent;
                display: block;
                
                a{
                    color: #00E054;
                    text-decoration: none;
                }

                span{
                    cursor: pointer;
                }

                &:hover{
                    border-bottom: 1px solid #00E054;
                }
            }
        }
    }
`;

export const TabDetails = styled.div`
    .tab-details{
        display: flex;

        .tab{
            text-transform: uppercase;
            flex : 0 0 40%;
            font-size: .85rem;
            font-weight: 400;
            span{
                border-bottom: 1px dotted #D8D8D8;
                display: block;
            }
        }

        .detail{
            flex: 1;
            font-size: .85rem;
            padding-left: 1rem;
            
            span{
                display: inline-block;
                margin-right: 5px;
                border-radius: 3px;
                font-size: .8rem;
                text-decoration: none;
                background: #283038;
                color: #9ab;
                padding: 3px 6px;
                margin-bottom: 8px;
            }
        }
    }

    .runtime{
        font-size: .8rem;

        a{
            margin-left: 5px;
            display: inline-block;
            border-radius: 3px;
            font-size: .8rem;
            text-decoration: none;
            border: 2px solid #9ab;
            background: transparent;
            color: #D8D8D8;
            padding: 3px 6px;
            margin-bottom: 8px;
            transition: border ease-in-out 200ms;

            &:hover{
                border: 2px solid #D8D8D8;
            }
        }
    }

`;

// Styled components of Log

export const LogContainer = styled.div`
    background: #456;
    border-radius: 5px;
    min-width: 90px;
    max-height: 225px;
    grid-row: 3/4;

    @media ( min-width: 768px ){
        grid-column: 3/4;
        grid-row: 1/3;
    }
    .icons{
        display: flex;
        border-bottom: 1px solid #2c3440;

        .icon{
            flex: 1;
            padding: 1rem;

            i{
                font-size: 2rem;
                margin-bottom: 8px;
                color: #2c3440;
                cursor: pointer;
            }
            
            span{
                font-size: .9rem;
            }

            i, span{
                display: block;
                text-align: center;
            }
        }
    }

    .rate{
        margin: 0 !important;
        padding: .8rem 0;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #2c3440;

        .rated{
            text-align: center;
            font-size: .9rem;
        }

        .stars{
            text-align: center;
            width: 100%;
            font-size: 2rem;
            color: #2c3440;
            margin-top: 8px;
            direction: rtl;
            position: relative;
        
            &:hover .remove-score{
                display :block;
            }

            .remove-score{
                position:absolute;
                top: .7rem;
                left: .8rem;
                font-size:1rem;
                display:none;
            }

            i{
                cursor: pointer;

                &:hover:not(.remove-score){
                    color: #00E054;
                }
            }

            .b1{
                &:hover ~ i{
                    color: #00E054;
                }
            }
            
            .b2{
                &:hover ~ i{
                    color: #00E054;
                }
            }
            .b3{
                &:hover ~ i{
                    color: #00E054;
                }
            }
            .b4{
                &:hover ~ i{
                    color: #00E054;
                }
            }
            .b5{
                &:hover ~ i{
                    color: #00E054;
                }
            }
        }
    }

    .review{
        padding: 1rem 0;
        .add-delete-review{
            text-align: center;
            display: block;
            cursor: pointer;
            font-size: .9rem;

            &:hover{
                color: white;
            }
        }
    }   
   
`;