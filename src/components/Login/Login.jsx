import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { loginUserAsync, selectError, selectLoggedInUser } from '../../features/auth/authSlice';
import "./Login.css";
import loginImg from "../../images/loginImg.png";
import { FcGoogle } from "react-icons/fc";
import {BsThreeDots} from "react-icons/bs"
import { Link, Navigate} from "react-router-dom";
import { useForm } from 'react-hook-form';

function Login() {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const user = useSelector(selectLoggedInUser);
    const [isLoading, setIsLoading] = useState(false); 
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            {user && <Navigate to="/" replace={true}></Navigate>}
            <div className="loginPage">
                 <form noValidate onSubmit={handleSubmit((data) => {
                    setIsLoading(true);
                    dispatch(
                        loginUserAsync({ email: data.email, password: data.password })
                    ).then(() => {
                        setIsLoading(false); 
                    });
                })} className='signupPage'>
                    <div className="login-content">
                        {isLoading ? (
                            <div className="loader-container">
                                <BsThreeDots style={{fontSize:'40px', color:'red', display:'flex', justifyContent:'center', alignItems:'center' }} />
                            </div>
                        ) : (
                            <>
                        <div className="login-left">
                            <img src={loginImg} alt="" />
                        </div>
                        <div className="login-right">
                            <div className="login-logo">Logo</div>
                            <div className="google-login">
                                <div>
                                    <span>Signup your account</span>
                                    <span>See what is going on with your business</span>
                                </div>
                                <div className="google-login-button">
                                    <button>
                                        <FcGoogle className="google-icon" /> Continue with google
                                    </button>
                                </div>
                            </div>
                            <div className="or">
                                <span>------- or sign in with Email --------</span>
                            </div>
                            <div className="login-inputs">

                                <div className="email">
                                    <label htmlFor="email">Email</label>
                                    <input id="email"
                                        {...register('email', {
                                            required: 'email is required',
                                            pattern: {
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                message: 'email not valid',
                                            },
                                        })}
                                        type="email"
                                        placeholder="mail@abc.com" />
                                    {errors.email && (
                                        <p style={{ color: 'red', fontSize: '15px' }}>{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="password">
                                    <label>Password</label>
                                    <input id="password"
                                        {...register('password', {
                                            required: 'password is required',
                                        })}
                                        type="password" placeholder="**********" />
                                    {errors.password && (
                                        <p style={{ color: 'red', fontSize: '15px' }}>{errors.password.message}</p>
                                    )}
                                </div>

                                <button type='submit' className="login-btn">Login</button>
                                <div className="new-account">
                                    <span>Don't have account?</span>
                                    <Link to="/signupPage" style={{ fontWeight: 600 }}>Signup Account</Link>
                                </div>
                            </div>
                        </div>
                        </>
                        )}
                    </div>
                </form >
            </div>
        </>
    );
}

export default Login;
