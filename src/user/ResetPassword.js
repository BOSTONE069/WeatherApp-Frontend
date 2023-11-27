import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
//Eye icon to display or hide password
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from "../common/constants";
import { resetPasswordApi } from "../util/ApiUtil";

const ResetPassword = () => {
  const [open, setOpen] = useState(false);

  const { verificationToken } = useParams();

  let navigate = useNavigate();

  /**
   * The function `onFormSubmit` sends a request to the `resetPasswordApi` with a verification token
   * and a new password.
   * @param values - The `values` parameter is an object that contains the form values submitted by the
   * user. It typically includes fields like `email`, `password`, `name`, etc. In this case, it seems
   * like the `values` object contains a `password` field.
   * @param actions - The `actions` parameter is an object that contains functions to manipulate the
   * form state. It typically includes functions like `setSubmitting`, `setErrors`, and `setStatus`.
   * These functions can be used to update the form state based on the result of the API call.
   */
  const onFormSubmit = async (values, actions) => {
    const apiResponse = await resetPasswordApi(
      verificationToken,
      values.password
    );

    if (apiResponse.status === 1) {
      navigate("/reset");
      toast(
        "Your password had been reset successfully. Please proceed to login"
      );
    } else {
      actions.resetForm();
      toast(apiResponse.payLoad);
    }
  };

  // handle toggle for Eye icon
  const toggle = () => {
    setOpen(!open);
  };

  //yup validations for password and confirmpassword fields in the ResetPassword page
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase,One Number and One Special Case Character"
      )

      .min(PASSWORD_MIN_LENGTH, "Too Short!")
      .max(PASSWORD_MAX_LENGTH, "Too Long!")
      .required("password cannot be blank"),

    confirmPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase,One Number and One Special Case Character"
      )

      .min(PASSWORD_MIN_LENGTH, "Too Short!")
      .max(PASSWORD_MAX_LENGTH, "Too Long!")
      .required("password cannot be blank")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ResetPasswordSchema}
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
            Reset Account Password
          </h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <Form>
            <div className="mt-4">
              <label
                class="block text-purple-700 text-md mb-2 text-left"
                for="grid-first-name"
              >
                Enter your New Password
              </label>
              <div className="flex flex-row items-start">
                <Field
                  type={open === false ? "password" : "text"}
                  name="password"
                  placeholder="New Password"
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
            <div className="mt-4">
              <label
                class="block text-purple-700 text-md mb-2 text-left"
                for="grid-first-name"
              >
                Confirm Password
              </label>
              <div className="flex flex-row items-start">
                <Field
                  type={open === false ? "password" : "text"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
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
                <ErrorMessage name="confirmPassword" />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Reset Password
              </button>
            </div>
          </Form>
          <div className="mt-4 text-grey-600">
            Dont have an account?{" "}
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

export default ResetPassword;
