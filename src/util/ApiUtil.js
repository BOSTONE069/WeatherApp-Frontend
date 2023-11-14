//here we import axios and call all the API's used in the backend
// src/util/ApiUtil.js

import axios from "axios";
import { API_BASE_URL } from "../common/constants";

const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (
  reqStatus = 0,
  reqPayLoad = "Invalid request. Please try again later."
) => ({
  status: reqStatus,
  payLoad: reqPayLoad,
});

/**
 * The `signUpApi` function sends a POST request to the `/user/signup` endpoint with user information
 * and returns a response indicating success or failure.
 * @param firstName - The first name of the user signing up.
 * @param lastName - The `lastName` parameter is the last name of the user signing up for an account.
 * @param username - The `username` parameter is a string that represents the username of the user
 * signing up for an account.
 * @param phone - The `phone` parameter is used to pass the user's phone number during the sign-up
 * process.
 * @param emailId - The emailId parameter is the email address of the user signing up for an account.
 * @param password - The password parameter is the user's password for their account.
 * @returns a response object.
 */
const signUpApi = async (
  firstName,
  lastName,
  username,
  phone,
  emailId,
  password
) => {
  let response = frameResponse();

  try {
    const url = `${API_BASE_URL}/user/signup`;

    const apiResponse = await axios.post(url, {
      firstName,
      lastName,
      username,
      phone,
      emailId,
      password,
    });

    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (error) {
    if (error.response) {
      response = frameResponse(0, error.response.data.message);
      console.error(error.response);
    }
  } finally {
    return response;
  }
};

export const verifyEmailApi = async (token) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/verify/email`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

//login API from the backend
export const loginApi = async (username, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/login`;
    const apiResponse = await axios.post(url, { username, password });
    if (apiResponse.status === 200) {
      const payLoad = {
        token: apiResponse.headers.authorization, // the authorization token is present in response headers
        username: apiResponse.data.username,
      };
      response = frameResponse(1, payLoad);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
  } finally {
    return response;
  }
};

export const resetEmailLinkApi = async (email) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/reset/${email}`;
    const apiResponse = await axios.get(url);
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const resetPasswordApi = async (token, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/reset?password=${password}`;
    const headers = { headers: { Authorization: frameToken(token) } };
    const apiResponse = await axios.post(url, null, headers);

    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export { frameToken, frameResponse, signUpApi };
