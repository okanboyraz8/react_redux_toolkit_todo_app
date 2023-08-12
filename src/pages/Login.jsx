import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'

//react-toastify for "toast"
import { toast } from 'react-toastify'

//Spinner from components for isLoading
import Spinner from '../components/Spinner'

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
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
                    Create Your Own World!
                </h1>

            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>

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
                        <button type='submit' className='btn btn-block'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Login