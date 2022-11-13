import React from 'react';
import styled from '@emotion/styled';

const StyledHeader = styled.header`
    margin-block:1rem;
    font-family: 'Montserrat', sans-serif;

    & h1{
    text-align:center;
    }
`;


const Header = () => {
    return (
        <StyledHeader>
            <main><h1>Admin Dashboard - Geektrust Challenge</h1></main>
        </StyledHeader>
    )
}

export default Header