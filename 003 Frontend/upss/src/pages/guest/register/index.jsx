import './index.css'
import { Alert, Button, Input, notification } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validateEmail from '../../../utils/validateData';
import { signup } from '../../../services/authService';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as httpStatusCode from '../../../constants/httpStatusCode';

export default function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fullnameError, setFullnameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [messageBox, setMessageBox] = useState({
        type: "",
        msg: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            setMessageBox({
                type: "warning",
                msg: "Passwords do not match."
            });
            setUser({
                ...user,
                confirmPassword: "", // reset confirmPassword input
            });
            return;
        }

        const fullnameValid = validateUserData2("fullname", user.fullname)
        const usernameValid = validateUserData2("username", user.username)
        const passwordValid = validateUserData2("password", user.password)
        const confirmPasswordValid = validateUserData2("confirmPassword", user.confirmPassword)
        const emailValid = validateUserData2("email", user.email)

        if (fullnameValid && usernameValid && passwordValid && emailValid) {
            try {
                const resultAction = await dispatch(signup(user));
                const originalPromiseResult = unwrapResult(resultAction);
                if (originalPromiseResult) {
                    notification.success({
                        message: `${originalPromiseResult.msg} [${originalPromiseResult.code}]`,
                        description: "Full name: " + originalPromiseResult.data.fullname,
                    });
                    navigate("/login");
                }

            } catch (error) {

                setMessageBox({
                    type: "error",
                    msg: error.msg
                });

                notification.error({
                    message: "Error",
                    description: error.msg,
                })

            } finally {

            }

        }
    }


    const validateUserData = (name, value) => {
        let isValid = true;
        switch (name) {
            case "fullname":
                if (!value) {
                    setFullnameError("Full Name is required.")
                    isValid = false;
                } else {
                    setFullnameError("");
                }
                break;
            case "username":
                if (!value) {
                    setUsernameError("Username is required.")
                    isValid = false;
                } else {
                    setUsernameError("");
                }
                break;
            case "password":
                if (!value) {
                    setPasswordError("Password is required.")
                    isValid = false;
                } else {
                    if (value.length < 8) {
                        setPasswordError("Encryption password must have atleast 8 characters.");
                        isValid = false;
                    } else {
                        setPasswordError("");
                    }
                }
                break;
            case "confirmPassword":
                if (!value) {
                    setPasswordError("Confirm password is required.")
                    isValid = false;
                } else {
                    if (value.length < 8) {
                        setConfirmPasswordError("Encryption Confirm password must have atleast 8 characters.");
                        isValid = false;
                    } else {
                        setConfirmPasswordError("");
                    }
                }
                break;
            case "email":
                if (!value) {
                    setEmailError("Email is required.")
                    isValid = false;
                } else {
                    if (!validateEmail(value)) {
                        setEmailError("Email incorrect format.")
                        isValid = false;
                    } else {
                        setEmailError("");
                    }
                }
                break;

            default:
                break;
        }
        return isValid;
    };

    const validateUserData2 = (name, value) => {
        // Create object containing the errors
        const errorMessages = {
            fullname: "Full Name is required.",
            username: "Username is required.",
            password: {
                empty: "Password is required.",
                inValid: "Encryption password must have atleast 8 characters.",
            },
            confirmPassword: {
                empty: "Confirm password is required.",
                inValid: "Encryption Confirm password must have atleast 8 characters.",
                notMatch: "Passwords do not match.",
            },
            email: {
                empty: "Email is required.",
                inValid: "Email incorrect format.",
            },
        };
        // Create object containing the methods to update errors
        const setErrorFunctions = {
            fullname: setFullnameError,
            username: setUsernameError,
            password: setPasswordError,
            confirmPassword: setConfirmPasswordError,
            email: setEmailError,
        };
        const setErrorFunction = setErrorFunctions[name];

        if (!value) {
            setErrorFunction(errorMessages[name].empty || errorMessages[name]);
            return false;
        }
        if (name === "email" && !validateEmail(value)) {
            setErrorFunction(errorMessages.email.inValid);
            return false;
        }
        if (name === "password" && value.length < 8) {
            setErrorFunction(errorMessages.password.inValid);
            return false;
        }
        if (name === "confirmPassword") {
            if (!value) {
                setErrorFunction(errorMessages.confirmPassword.empty);
                return false;
            }
            if (value.length < 8) {
                setErrorFunction(errorMessages.confirmPassword.inValid);
                return false;
            }
            if (value !== user.password) {
                setErrorFunction(errorMessages.confirmPassword.notMatch);
                return false;
            }
        }

        setErrorFunction("");
        return true;

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });

        const validateReturn = validateUserData2(name, value);
        if (validateReturn == true) {
            setMessageBox({
                type: "success",
                msg: "User valid."
            });
        } else {
            setMessageBox({
                type: "warning",
                msg: "User invalid."
            });
        }
        
        if (user.fullname == "" | user.username == "" | user.password == "" | user.confirmPassword == "" | user.email == "") {
            setMessageBox({
                type: "warning",
                msg: "User invalid."
            });
        }
    };

    const [user, setUser] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        status: 1,
        roles: ["user"]
    });

    const inputRefFocus = useRef();
    useEffect(() => {
        if (inputRefFocus) {
            inputRefFocus.current.focus();
        }
    }, []);


    return (
        <>
            <div className='flex justify-center items-center h-screen bg-gray-100'>
                <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-3'>
                    <h3 className='text-center text-[20px] font-semibold uppercase'>Registration</h3>
                    <div className='flex flex-col gap-2'>
                        <label>Full name &#42;</label>
                        <Input type='text' ref={inputRefFocus} placeholder='Please enter your Full name' onChange={handleChange} name='fullname' status={fullnameError ? "error" : ""} />
                        {
                            fullnameError && (
                                <span className='error-message'>{fullnameError}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Username &#42;</label>
                        <Input type='text' placeholder='Please enter your Username' autoComplete="username" name='username' onChange={handleChange} status={usernameError ? "error" : ""} />
                        {
                            usernameError && (
                                <span className='error-message'>{usernameError}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Password &#42;</label>
                        <Input.Password placeholder='Please enter your Password' autoComplete="new-password" name='password' value={user.password} onChange={handleChange} status={passwordError ? "error" : ""} />
                        {
                            passwordError && (
                                <span className='error-message'>{passwordError}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Confirm password &#42;</label>
                        <Input.Password placeholder='Please confirm your Password' autoComplete="new-password" name='confirmPassword' value={user.confirmPassword} onChange={handleChange} status={confirmPasswordError ? "error" : ""} />
                        {
                            confirmPasswordError && (
                                <span className='error-message'>{confirmPasswordError}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Email &#42;</label>
                        <Input type='text' placeholder='Please enter your Email' name='email' onChange={handleChange} status={emailError ? "error" : ""} />
                        {
                            emailError && (
                                <span className='error-message'>{emailError}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            messageBox && (
                                <Alert
                                    type={messageBox.type} // "error" | "warning" | "success" | "info"
                                    message={messageBox.msg}
                                    style={{ marginBottom: "3px" }}
                                />
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Button htmlType='submit' className='w-full' type='primary'>
                            Register
                        </Button>
                    </div>
                    <div className='text-center'>
                        <span>Already have an account?</span>
                        <Link to="/login" className="text-blue-600 hover:text-blue-500">
                            Login here
                        </Link>
                    </div>
                </form>


            </div>
        </>
    )
}
