import axios from 'axios'
import React, { useState } from 'react'
import Input from '../../Components/Input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import { userSliceActions } from '../../store/userSlice'

const Login = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)
    let checkDisable = values.email === '' || values.password === ''
    const handleChange = event => {
        setError(false)
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }
    let emailIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#5a5a5a" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
    let passwordIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#5a5a5a" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(`${process.env.REACT_APP_SERVER_PATH}/Login/WebLogin`, {
            UserName: values.email,
            Password: values.password
        }).then((response) => {
            console.log(response.data)
            navigate('/dashboard')
            setLoading(false)
            localStorage.setItem('token', response.data.token)
            dispatch(userSliceActions.saveUserData({
                name: response.data.AccountDetails.Name,
                AccountPermissions: response.data.AccountPermissions[0]
            }))
        }).catch(e => {
            setError(true)
            setLoading(false)
            console.log(e.response.data, "error")
            if (e.response.data) {
                return setErrorText(e.response.data.Message)
            }
            setErrorText("Internet connection issue")


        })
    }
    return (
        <div className='w-full h-screen flex justify-center items-center bg-appColor'>
            <div className='flex flex-col items-center w-full'>
                <div className='bg-white p-4 mb-3 rounded'>
                    <img src='/logocompany.png' className='w-36 rounded ' />
                </div>
                <form onSubmit={handleLogin} className="w-11/12 md:w-96 bg-white rounded">
                    <Input
                        type="email"
                        placeholder="abc@gmail.com"
                        values={values.email}
                        name="email"
                        handleChange={handleChange}
                        inputIcon={emailIcon}
                        label="Email"
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        values={values.password}
                        name="password"
                        handleChange={handleChange}
                        inputIcon={passwordIcon}
                        label="Password"
                    />
                    {error && <p className='text-red-500 ml-1 mt-1 text-sm'>{errorText}</p>}

                    <div className='my-3 flex justify-center py-2'>
                        <button type="submit" className={`border ${checkDisable ? 'bg-blue-200' : 'bg-appColor'} p-2 rounded w-1/2 text-sm flex justify-center text-white`} disabled={checkDisable}>{!loading ? 'Login' : <Oval
                            height={16}
                            width={16}
                            color="white"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="white"
                            strokeWidth={2}
                            strokeWidthSecondary={2}

                        />}</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login