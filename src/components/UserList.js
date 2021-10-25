import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets/InviteIcon';

const ListContainer = ({ children }) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        //if the user is selected we will remove it from the selectedUsers
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        //otherwise we will add it to the selectedUsers
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        //we toggling the setSelected state
        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
        </div>
    )
}


const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            //if we loading something we want to get out of the function
            if (loading)
                return;
            //if not we want to set the state to true, we gonna start to get the users
            setLoading(true);

            try {
                const response = await client.queryUsers(
                    //we exclude ourself for the query search
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );
                //if we get users back we added to the user state
                if(response.users.length) {
                    setUsers(response.users);
                //otherwise we set list empty state to true
                } else {
                    setListEmpty(true);
                }
            //in case of error we set the error state to true
            } catch (error) {
               setError(true);
            }
            //we set loading state to false
            setLoading(false);
        }
        //if we got a client(meaning we are connected) we call getUsers function
        if(client) getUsers()
    }, []);

    //we handle the error
    if(error) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }
    //in case that the list is empty
    if(listEmpty) {
        return (
            <ListContainer>
                <div className="user-list__message">
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                Loading users...
            </div> :
                (users?.map((user, i) => (
                  <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    )
}

export default UserList;