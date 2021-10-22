import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup2.jpg'

//creating a instance of cookies to add the user information
const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {

    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //getting all the information decontructed from the form
        const { username, password, phoneNumber, avatarURL } = form;

        //url from we making the request
        const URL = 'http://localhost:4000/auth'

        //getting and decontructing data
        const { data :{token, userId, hashedPassword,fullName} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,
            {
                username, fullName: form.fullName, password, phoneNumber, avatarURL,
            })

        //adding the user information to the cookies
        cookies.set('token', token);
        cookies.set('fullName', fullName)
        cookies.set('username', username);
        cookies.set('userId', userId)

        //if we creting the user account we passing also the phoneNumber, the avatarURL and the hashedPassword
        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }
        //reload te application so the authToken ins the app.js is filled and we render our chat ap and the Auth component
        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account?"
                                : "Dont't have an account?"
                            }
                            <span onClick={switchMode}>
                                {isSignup ? ' Sign In' : ' Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src = {signinImage} alt= 'sign in'/>
            </div>
        </div>
    )
}

export default Auth
