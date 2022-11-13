import React from 'react';
import styled from '@emotion/styled';
import { CONFIG } from '@src/constants';
import chevronLeft from '@assets/chevronLeft.svg';
import chevronFirst from '@assets/chevronFirst.svg';
import chevronRight from '@assets/chevronRight.svg';
import chevronLast from '@assets/chevronLast.svg';

const StyledPagination = styled.nav`
    display:flex;
justify-content:center;

    & ul{
        list-style:none;
        display:flex;
        gap: .3em;

        & li{
            border: 1px solid hsl(208 7% 46%);
            padding: .4em .8em;
            cursor: pointer;
            display:flex;
            justify-content:center;
            align-items:center;

            & a{
                text-decoration:none;
                color: black;
                font-size: var(--18px);
                font-weight:500;
            }
        }

    }
`;

const Pagination = ({ totalUsers, paginate }) => {
    const usersPerPage = CONFIG.PAGE_SIZE;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <StyledPagination>
            <ul>
                <li><a href=""><img src={chevronFirst} alt="First Page" /></a></li>
                <li><a href=""><img src={chevronLeft} alt="Previous Page" /></a></li>
                {pageNumbers.map(num => <li key={num} onClick={() => paginate(num)}><a href="#" >{num}</a></li>)}
                <li><a href=""><img src={chevronRight} alt="Next Page" /></a></li>
                <li><a href=""><img src={chevronLast} alt="Last Page" /></a></li>
            </ul>
        </StyledPagination>
    )
}

export default Pagination