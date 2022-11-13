import React, { useRef } from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input`
    padding-inline-start: 2rem;
`

const Search = ({ handleUserInput }) => {
    const inputRef = useRef();
    const inputChangeHandler = () => handleUserInput(inputRef.current.value)
    return (
        <StyledInput aria-label="Search" type="text" placeholder='Search by name,email or role' ref={inputRef} onChange={inputChangeHandler} />
    )
}

export default Search