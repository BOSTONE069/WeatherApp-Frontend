import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { EMAIL_MAX_LENGTH } from "../common/constants";
import { resetEmailLinkApi } from "../util/ApiUtil";

const ResetEmailLink = () => {
  const onFormSubmit = async (values, actions) => {
    const apiResponse = await resetEmailLinkApi(values.email);

    if (apiResponse.status === 1) {
      toast(
        "You will receive a password reset email, if user with that email exists"
      );

      actions.resetForm();
    } else {
      toast(apiResponse.payLoad);
    }
  };

  //yup validations for all fields in the resetEmail page
  const ResetEmailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Looks like this is not an email")
      .matches("[^@ ]+@[^@ ]+\\.[^@ ]+", "Email is not valid")
      .max(EMAIL_MAX_LENGTH, "Email is too long")
      .required("Email cannot be empty"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={ResetEmailSchema}
      onSubmit={onFormSubmit}
    >
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 b">
        <div>
          <img
            alt=""
            className="h-20 w-20"
            src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
          />
          <h3 className="text-4xl font-bold text-purple-800">
            Forgot Password?
          </h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <Form>
            <div className="mt-4">
              <label
                class="block text-purple-700 text-md mb-2 text-left"
                for="grid-first-name"
              >
                Enter your email
              </label>
              <div className="flex flex-col items-start">
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />

                <div className="text-red-600 text-xs italic">
                  {" "}
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Send Password Reset Link
              </button>
            </div>
          </Form>
          <div className="mt-4 text-grey-600">
            Don't have an account?{" "}
            <span>
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link to="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default ResetEmailLink;