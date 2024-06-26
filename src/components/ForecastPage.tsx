
import React, { useState } from 'react';
import Degree from './Degree';
import Panel from './Panel';
import SearchPanel from './SearchPanel';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import {
  getHumidityValue,
  getWindDirection,
  getVisibilityValue,
  getSunTime,
  getPop,
} from '../helpers';

import { forecastType } from '../types';
import useWeather from '../hooks/useWeather';

type Props = {
  data: forecastType;
};

const ForecastPage = ({ data }: Props) => {
    const navigate = useNavigate();
  const [isCelsius, setIsCelsius] = useState(true);

  const { forecast, options, term, onOptionSelect, onSubmit, onInputChange, getWeather, setForecast, setTerm, setOptions ,currentWeather, weatherFetched } = useWeather();

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  };

    const handleSubmit = (): void => {
    onSubmit();
    if (forecast) {
      navigate('/forecast', { state: { forecast } });
    }
  };


  const convertTemp = (temp: number) => {
    return isCelsius ? temp : (temp * 9 / 5) + 32;
  };

  const today = data.list[0];

  // Function to get day name from date string
  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Filter the list for displaying the day weather for next 5 days
  const filteredList = data.list.filter((_, index) =>  index % 8 === 0)

  return (
    <div className="w-full md:max-w-[1200px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="mx-auto w-[1000px] ">

        <section className="mt-10 justify-right ">
       
        <SearchPanel
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={handleSubmit}
          />
        </section>
        <section className="text-left ml-3 mt-5">
          <h2 className="text-2xl font-black">
            {data.name} <span className="font-thin">{data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(convertTemp(today.main.temp))} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} ({today.weather[0].description})
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(convertTemp(today.main.temp_max))} /> L:{' '}
            <Degree temp={Math.floor(convertTemp(today.main.temp_min))} />
          </p>
          <div className="flex items-center justify-center mt-4">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={!isCelsius}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isCelsius?'Convert to Fahrenheit':'Convert to Celsius'}</span>
            </label>
          </div>
        </section>

        <h1 className="text-2xl font-black text-left ml-3"> Hourly Weather</h1>
         <section className="flex overflow-x-scroll mt-4 pb-2 mb-5 ">
           {data.list.map((item, i) => (
             <div
              key={i}
              className="inline-block text-center w-[100px] flex-shrink-0"
            >
              <p className="text-sm">
                {i === 0 ? 'Now' : item.dt_txt.split(' ')[1].substring(0,5)}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
              <Degree temp={Math.round(convertTemp(item.main.temp))} />
              <h1>{item.weather[0].main}</h1>
              
              </p>
            </div>
          ))}
        </section>

        <h1 className="text-2xl font-black text-left ml-3"> Daily Weather</h1>
        <section className="flex  mt-4 pb-2 mb-5">
          {filteredList.map((item, i) => (
            <div
              key={i}
              className="inline-block text-center w-[100px] flex-shrink-0"
            >
              <p className="text-sm">
                {i === 0 ? 'Today' : getDayName(item.dt_txt.split(' ')[0])}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(convertTemp(item.main.temp))} />
                <h1>{item.weather[0].main}</h1>
                <h2>L: <Degree temp={Math.round(convertTemp(item.main.temp_min))} /></h2>
                <h2>M: <Degree temp={Math.round(convertTemp(item.main.temp_max))} /></h2>
              </p>
            </div>
          ))}
        </section>
        <h1 className="text-2xl font-black text-left ml-3">  Current Weather</h1>
        <section className="flex flex-wrap justify-between text-zinc-700">

          <Panel
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Panel
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(convertTemp(today.main.feels_like))} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
          <Panel
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Panel
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <Panel
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          <Panel
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  );
};

export default ForecastPage;
