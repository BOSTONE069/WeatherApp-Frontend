import React, { useState, useEffect } from "react";
import { getHistoryWeatherDataApi } from "../../util/ApiUtil";
import DisplayWeatherData from "../CurrentWeatherData/DisplayWeatherData";
import NoHistoryWeatherPresent from "./NoHistoryWeatherPresent";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import TokenExpirationPage from "../TokenExpirationPage/TokenExpirationPage";

const HistoryWeatherData = ({ currentUser }) => {
  //result-store the history weather data results into an array
  const [results, setResults] = useState([]);
  //tokenExpired: used to track whether or. not the user’s authentication token has expired
  const [tokenExpired, setTokenExpired] = useState(false);
  //data: used to track if there is any history weather data available
  const [data, setData] = useState(null);
  //loading: used to show/hide the loading indicator
  const [loading, setLoading] = useState(true);

  //function to get the history weather data from the API
  const getMyResults = async () => {
    setLoading(true);
    const apiResponse = await getHistoryWeatherDataApi(currentUser.token);
    //if there is history weather data available, update the state variables and hide the loading indicator
    if (apiResponse && apiResponse.length > 0) {
      setResults(apiResponse);
      setData(true);
      setLoading(false);
    }
    //if there is no history weather data available, update the state variables and hided the loading indicator
    else if (apiResponse && apiResponse.length === 0) {
      setData(false);
      setLoading(false);
    }
    //if the authentication token has expired, update the state variables and hide the loading indicator
    else if (apiResponse.response.data.httpStatusCode === 401) {
      setTokenExpired(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyResults();
  }, []);

  if (tokenExpired) {
    return <TokenExpirationPage />;
  }

  //show the loading indicator if the data is being loaded
  if (loading) {
    return <LoadingIndicator />;
  }

  //if there is no history weather data available, render the NoHistoryWeatherPresent component
  if (data == false) {
    return (
      <div className="flex items=center justify-center">
        <NoHistoryWeatherPresent />;
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-col-2 sm:grid-cols-3 gap-4 p-4">
        {results.map((item, index) => (
          <div
            key={index}
            className="bg-black/20 text-purple-900 backdrop-blur-[80px] py-12 px-6 rounded-lg overflow-hidden"
          >
            <DisplayWeatherData apiResponse={item} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <NoHistoryWeatherPresent />
    </div>
  );
};

export default HistoryWeatherData;
