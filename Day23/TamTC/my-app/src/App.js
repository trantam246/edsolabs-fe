import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Search from "./components/Search/Search";
import { Default } from "react-awesome-spinners";
import WeatherList from "./components/Weather/WeatherList";
import RemoveVietNamese from "./components/Search/RemoveVietnamese";

function App() {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [address, setAddress] = useState(null);
  const getUserGeolocation = () => {
    try {
      setLoading(true);
      fetch("https://ipinfo.io/171.236.1.246?token=55cddd654da35a")
        .then((response) => response.json())
        .then((data) => {
          setAddress(data?.city);
          setLoading(false);
        });
    } catch (err) {
      console.log("has error address", err.message);
      setLoading(false);
    }
  };

  const addWeatherHandler = (value) => {
    try {
      setLoading(true);
      const myKey = "668b662680ba41c38ab40422210909";
      const requestUrl = `http://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${value}&days=3`;
      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        });
    } catch (err) {
      console.log("has error weather", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserGeolocation();
    addWeatherHandler(RemoveVietNamese(address));
  }, [address]);

  return (
    <>
      <Search onAddWeather={addWeatherHandler} />
      {loading ? (
        <div className="loading">
          <Default color="#fff" />{" "}
          <span> Getting information, please wait...</span>
        </div>
      ) : (
        <WeatherList data={weatherData}></WeatherList>
      )}
      <Footer />
    </>
  );
}

export default App;
