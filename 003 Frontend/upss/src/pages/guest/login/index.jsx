import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, verifyToken } from '../../../services/authService';
import { useDispatch } from 'react-redux';
import { Alert, Button, Input, notification } from 'antd';
import './index.css';
import { unwrapResult } from '@reduxjs/toolkit';
import { ROLE_ADMIN } from '../../../redux/constants/role';

export default function Login() {

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsernameValid = validateUserData("username", user.username);
    const isPasswordValid = validateUserData("password", user.password)
    if (isUsernameValid && isPasswordValid) {
      try {
        const resultAction = await dispatch(login(user));
        const originalPromiseResult = unwrapResult(resultAction); //throws if rejected  

        if (originalPromiseResult) {
          //Get user info
          const resultVerify = await verifyToken(originalPromiseResult.data.accessToken);
          //Check roles
          if (resultVerify.data.roles.some(item => item.roleName === ROLE_ADMIN)) {
            navigate('/admin/dashboard', { state: { user: resultVerify.data } }); // navigate and send user data
          } else {
            navigate('/user/dashboard', { state: { user: resultVerify.data } });
          }

          notification.success({
            message: `[${ resultVerify.msg }] [${ resultVerify.code }]`,
            description: "Welcome! , " + resultVerify.data.fullname,
          });
        }

      } catch (error) {
        setServerError(error.msg);
        notification.error({
          message: `Login failed [${ error.code }]`,
          description: error.msg
        });

      } finally {

      }
    }

  }

  const validateUserData = (name, value) => {
    let isValid = true;
    switch (name) {
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

      default:
        break;
    }
    return isValid;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    validateUserData(name, value);
  };


  const [user, setUser] = useState({
    username: "",
    password: "",
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

          <header>
            <h3 className='text-center text-[20px] font-semibold uppercase'>Sign in to your account</h3>
          </header>

          <main>
            <div className='flex flex-col gap-2'>
              <label>Username</label>
              <Input type='text' ref={inputRefFocus} placeholder='Please enter your username' onChange={handleChange} autoComplete="username" name='username' status={usernameError ? "error" : ""} />
              {
                usernameError && (
                  <span className='error-message'>{usernameError}</span>
                )
              }
            </div>
            <div className='flex flex-col gap-2'>
              <label>Password</label>
              <Input.Password placeholder='Please enter your password' onChange={handleChange} autoComplete="new-password" name='password' status={passwordError ? "error" : ""} />
              {
                passwordError && (
                  <span className='error-message'>{passwordError}</span>
                )
              }
            </div>
          </main>

          <footer>
            {
              serverError && (
                <Alert style={{ marginBottom: "3px" }} type='error' message={serverError} />
              )
            }

            <div className='flex flex-col gap-2'>
              <Button htmlType='submit' className='w-full' type='primary'>
                Login
              </Button>
            </div>
            <div className='text-center'>
              <span>Don't have an account?</span>
              <Link to="/register" className="text-blue-600 hover:text-blue-500">
                Click here to register
              </Link>
            </div>
          </footer>

        </form>
      </div>
    </>
  )
}
