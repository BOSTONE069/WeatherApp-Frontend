//here we import axios and call all the API's used in the backend
// src/util/ApiUtil.js

import axios from "axios";
import { API_BASE_URL } from "../common/constants";

const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (reqStatus = 0, reqPayLoad = "Invalid request. Please try again later.") => ({
  status: reqStatus,
  payLoad: reqPayLoad,
});

const signUpApi = async (firstName, lastName, username, phone, emailId, password) => {
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

export { frameToken, frameResponse, signUpApi };