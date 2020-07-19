import styled from '@emotion/styled';

export const Linksform = styled.div`
    display: flex;
    align-items: center;
    ul{
        list-style: none;
        position: relative;
        height: 72px;
        display: flex;
        align-items: center;
        padding-left: 0;
        li{
            .avatar-profile{
                display:flex;
                align-items: center;
                padding: 5px;

                &:hover{
                    background: #89a;
                    color: white;
                }

                img {
                    width: 26px;
                    border-radius: 50%;
                }
            }
            a,button{
                cursor: pointer;
                text-decoration: none;
                color: inherit;
                margin-right: 20px;
                text-transform: uppercase;
                font-size: .81rem; 
                padding: 5px 10px;
                font-weight: bold;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;

                &:hover{
                    background: #89a;
                    color: white;
                }
            }
        }
    }
    
    .profile li,
    .movies li,
    .series li {
        
        margin-right: 20px;

        div{
            padding: 5px 10px;
            font-size: .9rem;
            font-weight: bold;
            text-transform: uppercase;

            &:hover{
                background-color: #89a;
                color: white;
                border-radius: 4px 4px 0 0;
                padding: 5px 10px;
            }
        }

        position: relative;
        cursor: pointer;

        .drop-menu{
            list-style: none;
            position: absolute; 
            left: 0px;
            width: 220px;
            display: none;
            flex-direction: column;
            justify-content: start;

            li{
                &:hover .drop-menu{
                    background-color:#2c3440;
                }

                a{
                    display: block;
                    background-color: #89a;
                    text-transform: unset;
                    color: inherit;
                    text-decoration:none;
                    padding: 10px;  
                    width: 91%;
                    font-weight: bold;
                    text-align: start;
                    font-size: .81rem; 
                    &:hover{
                        background-color:#2c3440;
                    }
                }
            }
        
        }
    }

    .profile li:hover .drop-menu-profile{
        display:block;
    }
    .movies li:hover .drop-menu-movies{
        display: block;    
    }
    .series li:hover .drop-menu-series{
        display: block;    
    }
    
    .search{
        input[ type ="text" ]
        {
            width: 130px;
            height: 20px;
            border-radius: 10px;
            border: none;
            outline: none;
            padding: 5px 10px;
            font-size: .81rem;
        }
    }
`;