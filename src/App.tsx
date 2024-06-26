
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ForecastPage from './components/ForecastPage';
import SearchPanel from './components/SearchPanel';
import { forecastType } from './types';
import useGeolocation from './hooks/useGeolocation';
import Panel from './components/Panel';
import Degree from './components/Degree';


import {
  getHumidityValue,
  getWindDirection,
  getVisibilityValue,
  getSunTime,
  getPop,
} from './helpers';

import useWeather from './hooks/useWeather';

const App = (): JSX.Element => {
  const [isCelsius, setIsCelsius] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange, getWeather, setForecast, setTerm, setOptions, currentWeather, weatherFetched } = useWeather();
  const { position, error } = useGeolocation();

  // Reset states when navigating back to the root path
  useEffect(() => {
    if (!weatherFetched && position) {
      getWeather(position.lat, position.lon);
    }
  }, [position, getWeather, weatherFetched]);

  useEffect(() => {
    if (location.pathname === '/') {
      setTerm(''); 
      setForecast(null); 
      setOptions([]);
    }
  }, [location, setTerm, setForecast, setOptions]);

  const handleSubmit = (): void => {
    console.log("Button hit")
    onSubmit();
    if (forecast) {
      
      navigate('/forecast', { state: { forecast } });
    }
    else {
      
      console.log("Not available")
    }
  };

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9 / 5) + 32;
  };


  const ForecastWrapper = () => {
    const location = useLocation();
    const { forecast } = location.state as { forecast: forecastType } || { forecast: null };

    if (!forecast) {
      return <div>No forecast data available</div>;
    }

    return <ForecastPage data={forecast} />;
  };
  console.log(currentWeather)

  return (
    <div style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
    }}
      className="min-h-screen w-full bg-cover flex justify-center items-center bg-center"
    >
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex flex-col justify-center items-center w-full h-full">


              <SearchPanel
                term={term}
                options={options}
                onInputChange={onInputChange}
                onOptionSelect={onOptionSelect}
                onSubmit={handleSubmit}
              />
              <div className="w-full md:max-w-[1000px] p-4 flex flex-col text-center items-center
               justify-center md:px-10 lg:p-24 mt-10 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700">
                
              <label className="inline-flex items-center cursor-pointer mb-4">
              <input 
                type="checkbox" 
                checked={!isCelsius}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isCelsius?'Convert to Fahrenheit':'Convert to Celsius'}</span>
            </label>
                {currentWeather &&
                  (<div>
                    <h1 className="text-4xl font-bold text-center">Current Location : {currentWeather.name},{currentWeather.sys.country}</h1>
                    <p className='text-1xl font-black' >L: {<Degree temp={Math.round(convertTemp(currentWeather.main.temp_min))} />} 
                    | H: {<Degree temp={Math.round(convertTemp(currentWeather.main.temp_max))} />}</p>

                  </div>)
                }

                {error && <p>{error}</p>}
                {position && (
                  <div className="flex flex-col items-center w-full mt-4">
                    <p>Your location: {position.lat}, {position.lon}</p>
                    {currentWeather && (

                      <section className="flex flex-wrap justify-between text-zinc-700 mt-3">
                        <section  className="w-[100px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-4 m-3 flex">

                          <div className="inline-block  text-center w-[80px] flex-shrink-0" >
    
                            <h1 className='text-1xl font-black'>{currentWeather.weather[0].main}</h1>
                            <img
                              alt={`weather-icon-${currentWeather.weather[0].description}`}
                              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                            />
                        
                          </div>

                        </section>

                        <Panel
                          icon="feels"
                          title="Feels like"
                          info={<Degree temp={Math.round(convertTemp(currentWeather.main.feels_like))} />}
                          description={`Feels ${Math.round(currentWeather.main.feels_like) < Math.round(currentWeather.main.temp)
                              ? 'colder'
                              : 'warmer'
                            }`}
                        />
                        <Panel
                          icon="pressure"
                          title="Pressure"
                          info={`${currentWeather.main.pressure} hPa`}
                          description={` ${Math.round(currentWeather.main.pressure) < 1013 ? 'Lower' : 'Higher'
                            } than standard`}
                        />
                        <Panel
                          icon="visibility"
                          title="Visibility"
                          info={`${(currentWeather.visibility / 1000).toFixed()} km`}
                          description={getVisibilityValue(currentWeather.visibility)}
                        />

                      </section>

                    )}
                  </div>
                )}
              </div>
            </main>
          }
        />
        <Route
          path="/forecast"
          element={<ForecastWrapper />}
        />
      </Routes>
    </div>
  );
};

export default App;

