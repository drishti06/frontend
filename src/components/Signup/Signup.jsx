import React from 'react'
import "./Signup.css"
import loginImg from "../../images/loginImg.png";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, createUserAsync } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            {user && <Navigate to={'/'} replace={true}></Navigate>}
            <form noValidate onSubmit={handleSubmit((data) => {
                dispatch(
                    createUserAsync({
                        email: data.email,
                        password: data.password,
                        addresses: [],
                    })
                );
            })} className='signupPage'>
                <div className="login-content">
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
                                    type="email" placeholder="mail@abc.com" />
                                {errors.email && (
                                    <p style={{ color: 'red', fontSize: '15px' }}>{errors.email.message}</p>
                                )}

                            </div>
                            <div className="password">
                                <label>Password</label>
                                <input name='password' id="password"
                                    {...register('password', {
                                        required: 'password is required',
                                        pattern: {
                                            value:
                                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `- at least 8 characters\n
                                            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                                            - Can contain special characters`,
                                        },
                                    })}
                                    type="password" placeholder="**********" />
                                {errors.password && (
                                    <p style={{ color: 'red', fontSize: '15px' }}>{errors.password.message}</p>
                                )}
                            </div>
                            <div className="confirm-password">
                                <label>Confirm Password</label>
                                <input name='confirmPassword' id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: 'confirm password is required',
                                        validate: (value, formValues) =>
                                            value === formValues.password || 'password not matching',
                                    })} type="password" placeholder="**********" />
                                {errors.confirmPassword && (
                                    <p style={{ color: 'red', fontSize: '15px' }}>
                                        {errors.confirmPassword.message}
                                    </p>
                                )}

                            </div>
                            <button type='submit' className="login-btn">Sign up</button>
                            <div className="new-account">
                                <span>Already have account?</span>
                                <Link to="/loginPage" style={{ fontWeight: 600 }}>Login Your Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </>
    )
}

export default Signup