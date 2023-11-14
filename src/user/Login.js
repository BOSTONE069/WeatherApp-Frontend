import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BPTN from "../images/BPTN.png";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
//Eye icon to display or hide password
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { loginApi } from "../util/ApiUtil";
import { AppContext } from "../Context/applicationContext";
import { useNavigate } from "react-router-dom";

import {
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from "../common/constants";



const Login = () => {

    let navigate = useNavigate(); //useNavigate hook which helps us to redirect to the respective route
    const appContext = useContext(AppContext); //useContext hook which helps to make use of AppContext

    const [open, setOpen] = useState(false);

    const onFormSubmit = async (values, actions) => {
        //call the loginApi and pass the field values
        const apiResponse = await loginApi(values.username, values.password);
        const payLoad = apiResponse.payLoad;
    
        if (apiResponse.status === 1) {
    
            appContext.setSession(payLoad);  //storing the token and username into cookies
            console.log(payLoad);
            navigate("/");
            toast("Login successful");
        } else {
           actions.resetForm(); // reset form
           toast(apiResponse.payLoad);
        }
    };

    // handle toggle for Eye icon
    const toggle = () => {
        setOpen(!open);
    };

    //yup validations for all fields in the login page 
    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(USERNAME_MIN_LENGTH, "Too Short!")
            .max(USERNAME_MAX_LENGTH, "Too Long!")
            .required("User Name cannot be empty"),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase,One Number and One Special Case Character"
            )
            .min(PASSWORD_MIN_LENGTH, "Too Short!")
            .max(PASSWORD_MAX_LENGTH, "Too Long!")
            .required("password cannot be blank"),
    });

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={onFormSubmit}
        >
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 b">
                <div>
                    <img
                        alt=""
                        className="h-20 w-20"
                        src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
                    />
                    <h3 className="text-4xl text-purple-800 font-bold text-center">
                        Welcome to Weather app
                    </h3>
                </div>
                <h4 className="text-2xl text-black-600">
                    Everything you need to know about weather is only one glance away now!
                </h4>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    <Form>
                        <div className="mt-4">
                            <label
                                class="block text-purple-700 text-md mb-2 text-left"
                                for="grid-first-name"
                            >
                                Username
                            </label>

                            <div className="flex flex-col items-start">
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <div className="text-red-600 text-xs italic">
                                    {" "}
                                    <ErrorMessage name="username" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                class="block text-purple-700 text-md mb-2 text-left"
                                for="grid-first-name"
                            >
                                Password
                            </label>

                            <div className="flex flex-row items-start">
                                <Field
                                    type={open === false ? "password" : "text"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span className="text-2xl">
                                    {open === false ? (
                                        <AiFillEye onClick={toggle} />
                                    ) : (
                                        <AiFillEyeInvisible onClick={toggle} />
                                    )}
                                </span>
                            </div>
                            <div className="text-red-600 text-xs italic">
                                {" "}
                                <ErrorMessage name="password" />
                            </div>
                        </div>

                        <Link
                            to="/resetEmailLink"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Login
                            </button>
                        </div>
                    </Form>

                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>

                    <div className="mt-4 text-grey-600">
                        Dont have an account?{" "}
                        <span>
                            <Link to="/signup" className="text-purple-600 hover:underline">
                                Sign up
                            </Link>
                        </span>
                    </div>

                    <div className="my-6 space-y-2">
                        <div
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <p>Powered by</p>
                            <img className="w-20 h-10" src={BPTN} />
                        </div>
                    </div>
                </div>
            </div>
        </Formik>
    );
}

export default Login