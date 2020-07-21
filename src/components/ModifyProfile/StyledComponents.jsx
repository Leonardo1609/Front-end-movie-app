import styled from '@emotion/styled';

export const AcountSettingsTitle = styled.h2`
    margin-top: 3rem;
    @media ( min-width: 768px ){
        padding: 0;
    }
`;
export const FormSettings = styled.form`
    display:grid;
    grid-template-rows: repeat( 3, auto-fill );
    @media ( min-width: 768px ){
        grid-template-columns: 45% 1fr;
        grid-template-rows: repeat( 2, auto );
        grid-gap: 0 3rem;
        padding: 0;
    }

    .inputs-form{

        grid-row: 1/2;
        
        @media ( min-width: 768px ){
            grid-column: 1/2;
        }

        label{
            display:block;
            text-transform: uppercase;
            font-weight: 700;
            margin-top: 1.5rem;
        }
        input[type="text"],
        input[type="email"]{
            box-sizing: border-box;
            width: 100%;
            border-radius: 3px;
            border: none;
            outline: none;
            margin: 10px 0;
            height: 25px;
            padding: 1.2rem 10px;
            background-color: #2c3440;
            box-shadow: inset 0 -1px 0 #456;
            color: #89a;
            &:focus{
                background: rgb(232, 240, 254);
                color: black; 
            }
        }
        
        textarea{
            box-sizing: border-box;
            max-width: 100%;
            min-width: 100%;
            min-height: 150px;
            border-radius: 3px;
            border: none;
            outline: none;
            margin: 10px 0;
            height: 25px;
            padding: 10px 10px;
            background-color: #2c3440;
            box-shadow: inset 0 -1px 0 #456;
            color: #89a;
            &:focus{
                background: rgb(232, 240, 254);
                color: black; 
            }
        }
        .avatar-image{
            margin-top: 1rem;
            max-width: 150px;
            margin-left: calc(50% - 75px);
        }
    }
    
    .favorites{
        
        grid-row: 2/3;

        @media ( min-width: 768px ){
            grid-column: 2/3;
            grid-row: 1/2;
        }

        text-transform: uppercase;
        
        h4{
            margin-bottom: 0;
        }
        .list-favorites{
            padding: 0;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;   
            list-style: none;  
        }
    }

    .buttons{

        grid-row: 3/4;

        @media ( min-width: 768px ){
            grid-column: 1/2;
            grid-row: 2/3;
        }

        margin: 2rem 0 4rem 0;
        min-width: 100%;
        display: flex;
        justify-content: space-between;
        input[type = "submit"], button{
            padding: 10px 1rem;  
            text-transform: uppercase;
            border-radius: 3px;
            border: none;
            outline: none;
            color: #D8E0E8;
            font-weight: bold;
            font-size: .8rem;
            text-decoration: none;
            cursor: pointer;

            &:hover{
                color: white;
            }
        }

        input[ type = "submit" ] {
            background: #00b020;
        }
        button {
            background: #456;
        }
    }  
`;

export const FavoriteItem = styled.div`
    display:block;
    width: 65px;
    height: 100px;
    
    @media ( min-width: 768px ){
        width: 100px;
        height: 150px;
    }

    border: 1px solid #456;
    background-color: #2c3641;
    margin-right: .8rem;
    margin-bottom: 1rem;
    border-radius: 3px;
    cursor: move;
    position: relative;
    &::after{
        content: '\f055';
        font-family: FontAwesome;
        position: absolute;
        top: 42%;
        left: 45%;
        color: #89a;
    }

    button{
        position: absolute;
        right: -10px;
        top: -10px;
        border-radius: 50%;
        color: white;
        background-color: #456;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: .9rem;
    }
`;

export const ModalContainer = styled.div`
    h4{
        text-transform: uppercase;
        font-weight: 400;
    }
    div{
        label{
            display:block;
            width: 100%;
            font-size: .8rem;
            margin-bottom: .5rem;
        }

        input[ type = "text" ]{
            width:100%;
            width:100%;
            position:relative;
            padding: 7px 5px;
            box-sizing: border-box;
        }

        ul{
            top: 124px;
            position:absolute;
            list-style:none;
            padding: 0;
            max-width: 350px;
            min-width: 350px;
            max-height: 200px;
            overflow-y: scroll;
            li{
                cursor: pointer;
                padding: 5px 10px;
                color: #fff;
                background: #3e4a61;
                font-size: .8rem;
                letter-spacing: .8px;
                &:hover{
                    background: #00b020;
                }

                .item-category{
                    font-size: .6rem;
                    text-transform: uppercase;
                    font-weight: bold;
                }
            }
        }
    }
`;