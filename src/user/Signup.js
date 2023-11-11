import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import BPTN from "../images/BPTN.png";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
//Eye icon to display or hide password
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signUpApi } from "../util/ApiUtil";

import {
  FIRSTNAME_MIN_LENGTH,
  FIRSTNAME_MAX_LENGTH,
  LASTNAME_MIN_LENGTH,
  LASTNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../common/constants";

const Signup = () => {
  const [open, setOpen] = useState(false);

  const onFormSubmit = async (values, actions) => {
    const apiResponse = await signUpApi(
      values.firstName,
      values.lastName,
      values.username,
      values.phone,
      values.email,
      values.password
    );

    if (apiResponse.status === 1) {
      toast.success(`Registration successful for ${values.email}`);
      actions.resetForm();
    } else {
      toast.error(`Registration failed: ${apiResponse.payLoad}`);
      actions.resetForm();
    }
  };

  // handle toggle for Eye icon(password)
  const toggle = () => {
    setOpen(!open);
  };

  //yup validations for all fields in the sign up page
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(FIRSTNAME_MIN_LENGTH, "Too Short!")
      .max(FIRSTNAME_MAX_LENGTH, "Too Long!")
      .required("First Name cannot be empty"),
    lastName: Yup.string()
      .min(LASTNAME_MIN_LENGTH, "Too Short!")
      .max(LASTNAME_MAX_LENGTH, "Too Long!")
      .required("Last Name cannot be empty"),
    username: Yup.string()
      .min(USERNAME_MIN_LENGTH, "Too Short!")
      .max(USERNAME_MAX_LENGTH, "Too Long!")
      .required("User Name cannot be empty"),
    phone: Yup.string().required("Phone Number cannot be empty"),
    email: Yup.string()
      .email("Looks like this is not an email")
      .matches("[^@]+@[^@ ]+\\.[^@ ]+", "Email is not valid")
      .max(EMAIL_MAX_LENGTH, "Email is too long")
      .required("Email cannot be empty"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .min(PASSWORD_MIN_LENGTH, "Too Short!")
      .max(PASSWORD_MAX_LENGTH, "Too Long!")
      .required("Password cannot be blank"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={onFormSubmit}
    >
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 b">
        <div>
          <img
            alt=""
            className="h-20 w-20"
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
          />
          <h3 className="text-4xl font-bold text-purple-800">Join us !</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <Form>
            <div className="mt-4">
              <label
                class="block text-purple-700 text-md mb-2 text-left"
                for="grid-first-name"
              >
                First Name
              </label>
              <div className="flex flex-col items-start">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="text-red-600 text-xs italic">
                  {" "}
                  <ErrorMessage name="firstName" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                class="block text-purple-700 text-md mb-2 text-left"
                for="grid-first-name"
              >
                Last Name
              </label>
              <div className="flex flex-col items-start">
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="text-red-600 text-xs italic">
                  {" "}
                  <ErrorMessage name="lastName" />
                </div>
              </div>
            </div>
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
                Phone
              </label>
              <div className="flex flex-col items-start">
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="text-red-600 text-xs italic">
                  {" "}
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                class="block text-purple-700 text-md mb-2 text-left"
                for="grid-first-name"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="text-red-600 text-xs italic">
                  {" "}
                  <ErrorMessage name="email" />
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
            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </Form>

          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </span>
          </div>

          <div className="my-6 space-y-2">
            <div className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400">
              <p>Powered by</p>
              <img className="w-20 h-10" src={BPTN} />
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Signup;
