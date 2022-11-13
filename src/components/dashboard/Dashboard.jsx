import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import Search from '@components/search/Search';
import UsersList from '@components/users/Users-List';
import UpdateUserDetails from '../updateUser/UpdateUserDetails';
import Pagination from '@components/pagination/Pagination';
import { fetchUsers, searchUsers, deleteSelectedUsers } from '@src/helpers';

const StyledDashboard = styled.div`

    & > .details{
        padding: 1em;
        background-color: var(--color-table-background);
        border: 1px solid var(--color-table-border);
        margin-block-end: .8rem;

    & > input{
        width:100%;
        margin-block-end:1rem;
    }
    }

    & > .tools{
        display: flex;
        justify-content: space-between;

        & > button{
            background-color:crimson;
            color: white;
            padding:.3em .6em;
            border:none;
            outline:none;
            cursor: pointer;
        }
    }

`

const Dashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [usersToBeEdited, setUserToBeEdited] = useState({});

    const selectAll = useRef(null);
    const userEditorRef = useRef(null);

    const handleUserInput = userInput => {
        setSearchInput(userInput);
    }

    const selectSingleUser = (id, displayedUsers = currentUsers) => {
        const index = displayedUsers.findIndex((user) => user.id === id);
        displayedUsers[index].isChecked = !displayedUsers[index]
            .isChecked;
        setFilteredUsers(displayedUsers);
        selectAll.current.checked = false;
    };

    const selectAllUsersInCurrentPage = (evt, currentUsers, usersGettingUpdated = allUsers) => {
        currentUsers.forEach((user) => {
            const { id } = user;
            const idx = usersGettingUpdated.findIndex((user) => user.id === id);
            usersGettingUpdated[idx].isChecked = evt.target.checked;
        });
        setFilteredUsers(currentUsers);
    };

    const userEditor = user => {
        setUserToBeEdited(user);
        userEditorRef.current.open = true;
    };

    const updateUserDetails = (savedUser, displayedUsers = currentUsers) => {
        console.log(savedUser);
        const index = displayedUsers.findIndex((user) => user.id === savedUser.id);
        displayedUsers[index] = { ...savedUser };
        setFilteredUsers(displayedUsers);
    };


    const deleteUser = (id, users = filteredUsers) => {
        const activeFilteredUsersList = users.filter(user => user.id !== id);
        const activeUsersList = allUsers.filter((user) => user.id !== id);
        setSearchInput(null);
        setAllUsers(activeUsersList);
        setFilteredUsers(activeFilteredUsersList);
    };

    const handleDeletingSelectedUsers = () => {
        const idsOfUsersToBeDeleted = filteredUsers.filter((user) => user.isChecked)
            .map((user) => user.id);
        const activeFilteredUsersList = deleteSelectedUsers(filteredUsers);
        const activeUsersList = allUsers.filter(
            (user) => !idsOfUsersToBeDeleted.includes(user.id)
        );
        setSearchInput(null);

        setFilteredUsers(activeFilteredUsersList);
        setAllUsers(activeUsersList);
        selectAll.current.checked = false;

    }

    useEffect(() => {
        fetchUsers(setAllUsers, setError)
    }, []);

    useEffect(() => {
        if (!searchInput) {
            setFilteredUsers(allUsers);
        } else {
            const searchedUsers = searchUsers(allUsers, searchInput)
            setFilteredUsers(searchedUsers);
            paginate(1);
        }
    }, [allUsers, searchInput]);

    useEffect(() => {
        selectAll.current.checked = false;
    }, [currentPage]);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = number => setCurrentPage(number);

    return (
        <StyledDashboard>
            <div className="details">
                <Search handleUserInput={handleUserInput} />
                <UsersList users={currentUsers} ref={selectAll} selectAllUsersInCurrentPage={selectAllUsersInCurrentPage} selectSingleUser={selectSingleUser} deleteUser={deleteUser} editUser={userEditor} />
            </div>
            <UpdateUserDetails user={usersToBeEdited} updateUser={updateUserDetails} ref={userEditorRef} />
            <div className="tools">
                <button onClick={handleDeletingSelectedUsers}>Delete Selected</button>
                <Pagination totalUsers={filteredUsers.length} paginate={paginate} currentPageNum={currentPage} />
            </div>
        </StyledDashboard>
    )
}

export default Dashboard