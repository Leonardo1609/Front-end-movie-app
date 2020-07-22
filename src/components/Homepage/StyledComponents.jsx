import styled from '@emotion/styled';

// export const Linksform = styled.div`
//     display: flex;
//     align-items: center;
    
//     ul{
//         list-style: none;
//         height: 72px;
//         display: flex;
//         align-items: center;
//         padding-left: 0;
//         /* display:none; */
        
//         @media( min-width:768px ){
//             position: relative;
//         }
//         li{
//             .fa-user{
//                 display: inline-block;
//                 cursor: pointer;
//                 margin-right: 25px;
//                 @media ( min-width: 768px ){
//                     display: none;
//                 }
//             }
//             .fa-times{
//                 display: inline-block;
//                 cursor: pointer;
//                 margin-right: 25px;
//                 @media ( min-width: 768px ){
//                     display: none;
//                 }
//             }
//             .signing{
//                 display:none;
                
//                 @media ( min-width: 768px ){
//                     display: inline-block;
//                 }
//             }
            
//             .fa-user-plus{
//                 margin-right: 25px;
//                 display: inline-block;
//                 cursor: pointer;
                
//                 @media ( min-width: 768px ){
//                     display: none;
//                 }
//             }
//             .create-account{
//                 display:none;

//                 @media ( min-width: 768px ){
//                     display: inline-block;
//                 }
//             }
//             .movies,.series{
//                 display: none;
//                 @media ( min-width: 768px ){
//                     display: unset;
//                 }
//             }

//             .avatar-profile{
//                 display:flex;
//                 align-items: center;
//                 padding: 5px;

//                 &:hover{
//                     background: #89a;
//                     color: white;
//                 }

//                 img {
//                     width: 26px;
//                     border-radius: 50%;
//                 }
//             }
//             a,button{
//                 cursor: pointer;
//                 text-decoration: none;
//                 color: inherit;
//                 margin-right: 20px;
//                 text-transform: uppercase;
//                 font-size: .81rem; 
//                 padding: 5px 10px;
//                 font-weight: bold;
//                 background: none;
//                 border: none;
//                 outline: none;
//                 cursor: pointer;

//                 &:hover:not(.not-hover){
//                     background: #89a;
//                     color: white;
//                 }
//             }
//             .not-hover{
//                 font-size: 1rem;

//                 @media ( min-width: 768px ){
//                     display: none;
//                 }
//             }
//         }
//     }
    
//     .profile li,
//     .movies li,
//     .series li {
        
//         margin-right: 20px;

//         div{
//             padding: 5px 10px;
//             font-size: .9rem;
//             font-weight: bold;
//             text-transform: uppercase;

//             &:hover{
//                 background-color: #89a;
//                 color: white;
//                 border-radius: 4px 4px 0 0;
//                 padding: 5px 10px;
//             }
//         }

//         position: relative;
//         cursor: pointer;

//         .drop-menu{
//             list-style: none;
//             position: absolute; 
//             left: 0px;
//             width: 220px;
//             display: none;
//             flex-direction: column;
//             justify-content: start;

//             li{
//                 &:hover .drop-menu{
//                     background-color:#2c3440;
//                 }

//                 a{
//                     display: block;
//                     background-color: #89a;
//                     text-transform: unset;
//                     color: inherit;
//                     text-decoration:none;
//                     padding: 10px;  
//                     width: 91%;
//                     font-weight: bold;
//                     text-align: start;
//                     font-size: .81rem; 
//                     &:hover{
//                         background-color:#2c3440;
//                     }
//                 }
//             }
        
//         }
//     }

//     .profile li:hover .drop-menu-profile{
//         display:block;
//     }
//     .movies li:hover .drop-menu-movies{
//         display: block;    
//     }
//     .series li:hover .drop-menu-series{
//         display: block;    
//     }
    

//     /* SEARCH FORM */
//     .search{
//         transition: 1s ease-in-out all;
//         position: absolute;
//         top: 80px;
//         left: 0;
//         width: 100%;
//         @media ( min-width: 768px ){
//             position: unset;
//             width: unset;
//             margin-left: 1rem;
//         }
        
//         input[ type ="text" ]
//         {
//             width: 95%;
//             height: 20px;
//             border: none;
//             outline: none;
//             padding: 10px 10px;
//             font-size: .81rem;
//             @media ( min-width: 768px ){
//                 padding: 5px 10px;
//                 border-radius: 10px;
//                 width: 130px;
//             }
//         }
//     }
// `;