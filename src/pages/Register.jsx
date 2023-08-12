import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'

//react-toastify
import { toast } from 'react-toastify'

//Spinner from components for "isLoading" from "state.auth"
import Spinner from '../components/Spinner'


function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        passwordCheck: ''
    })

    const { email, password, username, passwordCheck } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordCheck) {
            toast.warning("Passwords did not match")
        } else {
            const userData = {
                email,
                password,
                username
            }
            dispatch(register(userData))
        }
    }

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <section className='heading'>
                <h1>
                    Let's Create a Membership
                </h1>

            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='username'
                            name='username'
                            value={username}
                            placeholder='Enter Your Username'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter Your Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter Your Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='passwordCheck'
                            name='passwordCheck'
                            value={passwordCheck}
                            placeholder='Re-enter Your Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Sign up
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register