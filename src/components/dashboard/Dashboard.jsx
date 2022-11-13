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
    }

`

const Dashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);
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

    const selectAllUsersInCurrentPage = (event, displayedUsers, usersGettingUpdated = filteredUsers) => {
        displayedUsers.forEach((user) => {
            const { id } = user;
            const idx = usersGettingUpdated.findIndex((user) => user.id === id);
            usersGettingUpdated[idx].isChecked = event.target.checked;
        });
        console.log(displayedUsers, usersGettingUpdated);
        setFilteredUsers(usersGettingUpdated);
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
        setAllUsers(displayedUsers);
    };


    const deleteUser = (id, users = filteredUsers) => {
        const activeFilteredUsersList = users.filter(user => user.id !== id);
        const activeUsersList = allUsers.filter((user) => user.id !== id);
        console.log(activeUsersList);
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
    }

    useEffect(() => {
        fetchUsers(setIsLoading, setAllUsers, setError)
    }, []);

    useEffect(() => {
        if (!searchInput) {
            setFilteredUsers(allUsers);
        } else {
            const searchedUsers = searchUsers(allUsers, searchInput)
            setFilteredUsers(searchedUsers);
            setCurrentPage(1);

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
                <Pagination totalUsers={filteredUsers.length} paginate={paginate} />
            </div>
        </StyledDashboard>
    )
}

export default Dashboard