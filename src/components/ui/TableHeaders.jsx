import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

const StyledTableHeader = styled.header`

`

const TableHeader = forwardRef((props, ref) => {
    return (
        <StyledTableHeader>

        </StyledTableHeader>
    )
});

export default TableHeader;