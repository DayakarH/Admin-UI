import React, { useEffect, useState, forwardRef } from 'react';
import styled from '@emotion/styled';
import User from './user/User';
import TableHeader from '@components/ui/TableHeaders';

const StyledUsersData = styled.section`
    display:table;
    width:100%;
    border-collapse:separate;

    header{
        display: table-row;
    background-color: var(--color-table-header);
    padding-block: 4.5em;
    margin-block-end:1.5rem;

    & > *{
        display: table-cell;
        vertical-align:middle;
    }

    & input{
        margin-inline: .5rem 1rem;
        width:16px;
        height:16px;
    }

    & > h3{
    font-family: 'Montserrat', sans-serif;
    font-size:var(--18px);
    font-weight:600;
    }
    }
`;

const UsersList = forwardRef(({ users, selectAllUsersInCurrentPage, selectSingleUser, editUser, deleteUser }, ref) => {
    const handleHeaderCheckBox = (evt) => {
        selectAllUsersInCurrentPage(evt, users);
    };

    return (
        <>
            <StyledUsersData>
                <header>
                    <input type="checkbox" ref={ref} onChange={handleHeaderCheckBox} />
                    <h3>Name</h3>
                    <h3>Email</h3>
                    <h3>Role</h3>
                    <h3>Actions</h3>
                </header>
                <TableHeader ref={ref} onChange={handleHeaderCheckBox} />
                {users.map(user =>
                    <User key={user.id} name={user.name} id={user.id} role={user.role} email={user.email} isChecked={user.isChecked} selectUser={selectSingleUser} editUser={editUser} deleteUser={deleteUser} />)
                }
            </StyledUsersData>
        </>
    )
});

export default UsersList