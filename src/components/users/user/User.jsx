import React, { useState } from 'react';
import edit from '@assets/edit.svg';
import trash from '@assets/delete.svg';
import styled from '@emotion/styled';

const StyledUser = styled.div`
    display:table-row;
    transition: background-color 200ms ease-out;
    padding-block: 4.5em;

    & > *{
        display: table-cell;
        vertical-align:middle;
    }

    & > input{
        margin-inline: .5rem 1rem;
        width:14px;
        height:14px;
    }

    & > .role{
        text-transform:capitalize;
    }

    &:has(input:checked){
        background-color:var(--color-row-selected);
    }

    & > .actions{
        display:flex;
        gap:.71em;

        & > button{
            background:none;
            border:none;
            outline:none;
            cursor: pointer;
        }
    }
`
const User = ({ id, name, email, role, isChecked, selectUser, editUser, deleteUser }) => {

    const handleInputChange = () => selectUser(id);

    const handleEditRequest = () => editUser({ id, name, email, role })

    const handleUserDelete = () => {
        deleteUser(id);
    }

    return (
        <>
            <StyledUser className='user'>
                <input type="checkbox" checked={isChecked} onChange={handleInputChange} />
                <p> {name}</p>
                <p>{email}</p>
                <p className='role'>{role}</p>
                <div className="actions">
                    <button onClick={handleEditRequest}><img src={edit} alt="edit" /></button>
                    <button onClick={handleUserDelete}><img src={trash} alt="delete" /></button>
                </div>
            </StyledUser>
        </>
    )
}

export default User