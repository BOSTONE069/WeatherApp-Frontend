import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailApi } from "../util/ApiUtil";

const VerifyEmail = () => {
  const { verificationCode } = useParams();
  let navigate = useNavigate(); //userNavigate hook which helps us to re-direct to the respective route

  const onFormSubmit = async (values) => {
    const apiResponse = await verifyEmailApi(values.verificationCode);

    if (apiResponse.status === 1) {
      navigate("/login");
      toast("Congratulations your email has been successfully verified");
    } else {
      toast(apiResponse.payLoad);
    }
  };
  const emailVerificationSchema = Yup.object().shape({
    verificationCode: Yup.string().required(
      "Email verification code is required"
    ),
  });

  return (
    <div class="flex items-center justify-center min-h-screen p-5 min-w-screen">
      <div class="max-w-xl p-8 text-center text-purple-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
        <h3 class="text-2xl">Thanks for signing up </h3>
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-24 h-24 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <p>
          We're happy you're here.
          <br />
          <p>Below is your verification code</p>
        </p>
        <Formik
          initialValues={{
            verificationCode: verificationCode,
          }}
          validationSchema={emailVerificationSchema}
          onSubmit={onFormSubmit}
        >
          <Form>
            <div class="mt-4">
              <Field
                type="verificationCode"
                name="verificationCode"
                className="block w-full mt-1 border-black-500 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="text-red-600 text-xs italic">
                {" "}
                <ErrorMessage name="verificationCode" />
              </div>
              <br />
              <button class="px-2 py-2 text-white bg-indigo-600 rounded">
                Verify Email
              </button>
              <br />
              <br />
              <p>Note: The verification code is valid only for 24 hours</p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default VerifyEmail;