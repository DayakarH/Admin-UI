import React, { useState, useEffect, forwardRef } from 'react';
import close from '@assets/close.svg';
import styles from './UpdatedUserDetails.module.css';

// const StyledDialog = styled.dialog`
//     display: ${props => props.ref ? 'block' : 'none'};
//     width: 60%;
//     position: fixed;
//     top: 10%;
//     left: 20%;
//     padding: 2em 3em;


//         header{
//             font-family: 'Montserrat',sans-serif;
//             font-size: var(--20px);
//             font-weight:600;
//             text-align:center;
//             margin-block-end: 1rem;
//         }

//         form{
//             display:flex;
//             flex-direction:column;
//             gap: 1.5em;

//             .form-group{
//                 display:flex;
//                 flex-direction:column;
//                 gap: .5em;


//                 label{
//                 font-size: var(--18px);
//                 font-weight:500;
//                 }
//             }
//         }

// `;

const UpdateUserDetails = forwardRef(({ user, updateUser }, ref) => {
    const [userDetails, setUserDetails] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
    });
    const [disableSave, setDisableSave] = useState(false);

    const handleInputFieldChanges = (evt) => {
        const fieldName = evt.target.name;
        const fieldValue = evt.target.value;
        setUserDetails({ ...userDetails, [fieldName]: fieldValue });
    };

    const handleDialogClose = () => {
        ref.current.close();
    }
    const handleFormSubmission = () => {
        const updatedUserObj = {
            ...user,
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role,
        }
        updateUser(updatedUserObj);
        setDisableSave(true);
    }

    useEffect(() => {
        setUserDetails({
            name: user.name,
            email: user.email,
            role: user.role,
        });
        setDisableSave(false);
    }, [user]);


    return (
        <dialog ref={ref} className={styles.dialog}>
            <header className={styles.header}>
                <h3> Edit User Details</h3>
                <button onClick={handleDialogClose}><img src={close} alt='close' className={styles.closeSVG} /></button>
            </header>
            <form method='dialog' onSubmit={handleFormSubmission} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name"
                        value={userDetails.name || ''}
                        required
                        onChange={handleInputFieldChanges}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' name="email" value={userDetails.email || ''}
                        pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                        required onChange={handleInputFieldChanges}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role" value={userDetails.role} onChange={handleInputFieldChanges}>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                    </select>
                </div>

                <div className={styles.buttonGroup}>
                    <button onClick={handleDialogClose}>Cancel</button>
                    <button type='submit'>Save Changes</button>
                </div>
            </form>
        </dialog>
    )
});

export default UpdateUserDetails;