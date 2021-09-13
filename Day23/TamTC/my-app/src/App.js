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
      fetch(`${process.env.REACT_APP_API_ADDRESS_URL}?token=${process.env.REACT_APP_API_ADDRESS_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          setAddress(data?.city);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  const addWeatherHandler = (value) => {
    try {
      setLoading(true);
      const requestUrl = `${process.env.REACT_APP_API_WEATHER_URL}?key=${process.env.REACT_APP_API_WEATHER_KEY}&q=${value}&days=3`;
      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false);
        });
    } catch (err) {
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
          <Default color="#fff" />
          <span> Getting information, please wait...</span>
        </div>
      ) : (
        <WeatherList data={weatherData} />
      )}
      <Footer />
    </>
  );
}

export default App;
