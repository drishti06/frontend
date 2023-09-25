import { useEffect } from 'react';
import { selectLoggedInUser, signOutAsync } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        dispatch(signOutAsync());
    });
    return <>
        {!user && <Navigate to="/loginPage" ></Navigate>}
    </>;
}

export default Logout;
