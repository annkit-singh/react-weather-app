
import { useState, useEffect, ChangeEvent } from 'react';
import { optionType, forecastType } from '../types/index';

const BASE_URL = 'http://api.openweathermap.org';

const useWeather = () => {
  const [city, setCity] = useState<optionType | null>(null);
  const [term, setTerm] = useState<string>('');
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [weatherFetched, setWeatherFetched] = useState<boolean>(false);


  const getSearchOptions = async (term: string) => {
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=3&lang=en&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOptions(data);
      })
      .catch((e) => console.log({ e }));
  };
  //fetching currentWeather data
  const getWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      console.log("Api called")
      const data = await res.json();
      setCurrentWeather(data);
      setWeatherFetched(true); 
    } catch (error) {
      console.log('Error fetching current weather:', error);
    }
  };
//handling onSumit button and inserting data
  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
  };

  //Fetching weather forecast data
  const getForecast = async (data: optionType) => {
   await fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherFetched(true)
        const forecastData = {
          ...data.city,
          list: data.list,
        };
        setForecast(forecastData);
        console.log(forecast);
      })
      .catch((e) => {
        console.log({ e })});
  };
  //handling option select from dropdown
  const onOptionSelect = (option: optionType) => {
    console.log(option)
    setCity(option);
  };
  //handling input change while typing in search box
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(e.target.value);

    if (value !== '') {
      getSearchOptions(value);
    }
  };

  useEffect(() => {
    if (city) {
      console.log(city);
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
    getWeather,
    setForecast, 
    setTerm,
    setOptions, 
    currentWeather,
    weatherFetched,
  };
};

export default useWeather;


