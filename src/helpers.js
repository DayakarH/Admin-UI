import axios from "axios";
import { END_POINT } from "./constants";

const addAdditionalPropsToUsers = (users) => {
    const updatedUsers = users.map((user) => {
        user.isChecked = false;
        user.archive = false;
        user.edit = false;
        return user;
    });
    return updatedUsers;
};


export const fetchUsers = async (loadingState, applyData, applyError) => {
    loadingState(true);
    try {
        const res = await axios.get(END_POINT);
        const usersWithAddedProps = addAdditionalPropsToUsers(res.data);
        applyData(usersWithAddedProps);
    } catch {
        applyError(true);
    }
    loadingState(false);
}

export const searchUsers = (users, searchInput) => {
    const searchTerm = searchInput.toLowerCase();
    return users.filter(user => {
        const { name, email, role } = user;
        if (
            name.toLowerCase().includes(searchTerm) ||
            email.includes(searchTerm) ||
            role.includes(searchTerm)
        ) {
            return true;
        }
        return false;
    })
}

export const deleteSelectedUsers = (users) => {
    const activeUsersList = users.filter((user) => user.isChecked !== true);
    return activeUsersList;
};