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

export const getWeatherDataApi = async (token, location, save) => {
  // Build the URL to the weather API endpoints based on the location and save parameters
  const url = `${API_BASE_URL}/weathers/${location}/${save}`;

  // Set the headers for the HTTP request, including the user's authentication token
  const headers = {
    headers: { Authorization: frameToken(token) },
  };

  //Make a GET request for the API endpoint using axios, passing in the URL and headers
  const apiResponse = await axios.get(url, headers);

  // Return the response from the API
  return apiResponse;
};

export const getHistoryWeatherDataApi = async (token) => {
  let response = undefined; // Initialize response variable to undefined
  try {
    const url = `${API_BASE_URL}/weathers`; // API endpoint to fetch weather data
    const headers = { headers: { Authorization: frameToken(token) } }; // pass token in the request headers
    const apiResponse = await axios.get(url, headers); //Make API call to fetch weather data
    if (apiResponse.status === 200) {
      response = apiResponse.data// Check if response status is success                                                     response = apiResponse.data; // If successful, set the response variable to the data r
    }
  } catch (err) { // Catch any errors that may occur during the API call
    if (err.response) {
      response = err; // If there is a response, set the response variable to the error object
    }
    console.log(err); //Log the error in the console
  } finally { // Regardless of success or failure, return the response variable
    return response;
  }
};

export { frameToken, frameResponse, signUpApi };
