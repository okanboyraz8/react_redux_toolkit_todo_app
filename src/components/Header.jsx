import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

//Bütün Sayfalarda Görünecek bir Navbar Compenenti:
function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to="/">Welcome to "To Do" & Task Management App</Link>
            </div>
            <ul>
                {
                    user ? (
                        <>
                            <li>
                                <span>Hello {user.displayName}</span>
                            </li>
                            <li>
                                <button onClick={onLogout} className='btn'><FaSignOutAlt />Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login"><FaSignInAlt />Login</Link>
                            </li>
                            <li>
                                <Link to="/register"><FaUser />Register</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </header>
    )
}

export default Header