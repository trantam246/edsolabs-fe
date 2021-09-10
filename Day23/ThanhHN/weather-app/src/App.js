import { useState } from "react";
import weather from "./api/weather";
import { AppUI } from "./components";
import { ENTER_KEY } from "./constants";

function App() {
  
  const [city, setCity] = useState('');
  const [displayListCity, setDisPlayListCity] = useState(false);
  const [searchCityData, setSearchCityData] = useState([]);
  const [todayWeather, setTodayWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSearchCity = (e) => {
    setCity(e.target.value);
  }

  const handleSearch = () => {
    weather.searchWeather(city)
      .then(res => {
        setSearchCityData(res.data);
      })
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === ENTER_KEY) {
      handleSearch();
    }
  }

  const handleDisplayListCity = () => {
      setDisPlayListCity(true);
  }

  const handleDisplayNoneListCity = () => {
    setTimeout(() => {
      setDisPlayListCity(false);
    },200)
  }

  const handleCityClick = (url) => {
    setLoading(true);
    weather.getCurrentWeather(url)
      .then(res => setTodayWeather(res.data));

    weather.getForecastWeather(url)
      .then(res => setForecast(res.data.forecast.forecastday))
  }

  const handleShowModal = () => {
    setShowModal(true);
  }

  const hanldeCloseModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <AppUI 
        onChange={handleSearchCity}
        city={city}
        onSearch={handleSearch}
        onKeyUp={handleKeyUp}
        onFocus={handleDisplayListCity}
        onBlur={handleDisplayNoneListCity}
        displayListCity={displayListCity}
        searchCityData={searchCityData}
        onCityClick={handleCityClick}
        todayWeather={todayWeather}
        forecast={forecast}
        loading={loading}
        showModal={showModal}
        onClickMyName={handleShowModal}
        onClickModal={hanldeCloseModal}
      />
    </>
  );
}

export default App;