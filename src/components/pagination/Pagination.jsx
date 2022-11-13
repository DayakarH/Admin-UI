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

        & li.active{
            background-color: hsl(210 11% 15%);

            & a{
                color: hsl(210 17% 98%);
            }
        }

        & li.disabled a{
            pointer-events:none;
        }
    }
`;

const Pagination = ({ totalUsers, paginate, currentPageNum, setCurrentPage }) => {
    const usersPerPage = CONFIG.PAGE_SIZE;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    const firstPage = pageNumbers[0];
    const lastPage = pageNumbers[pageNumbers.length - 1];

    const handleFirstPage = () => paginate(firstPage);
    const handlePrevPage = () => paginate(currentPageNum - 1);
    const handleNextPage = () => paginate(currentPageNum + 1);
    const handleLastPage = () => paginate(lastPage);

    return (
        <StyledPagination>
            <ul>
                <li className={currentPageNum === firstPage ? 'disabled' : ''}
                    onClick={handleFirstPage}>
                    <a href=""><img src={chevronFirst} alt="First Page" /></a>
                </li>

                <li className={currentPageNum === firstPage ? 'disabled' : ''}
                    onClick={handlePrevPage}>
                    <a href=""><img src={chevronLeft} alt="Previous Page" /></a>
                </li>

                {pageNumbers.map(num => <li key={num} onClick={() => paginate(num)} className={num === currentPageNum ? 'active' : ''}><a href="#" >{num}</a></li>)}

                <li className={currentPageNum === lastPage ? 'disabled' : ''}
                    onClick={handleNextPage}>
                    <a href=""><img src={chevronRight} alt="Next Page" />
                    </a></li>

                <li className={currentPageNum === lastPage ? 'disabled' : ''}
                    onClick={handleLastPage}>
                    <a href=""><img src={chevronLast} alt="Last Page" /></a>
                </li>
            </ul>
        </StyledPagination>
    )
}

export default Pagination