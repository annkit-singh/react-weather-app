

export type optionType = {
  name: string
  country: string
  lat: number
  lon: number
}

export type forecastType = {
  name: string
  country: string
  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        speed: number
        gust: number
        deg: number
      }
      clouds: {
        all: number
      }
      dt_txt: string
      pop: number
      visibility: number
    }
  ]
  city: {
        id: 1260877,
        name: string
        coord: {
            lat: number
            lon: number
        }
        sunrise: number
        sunset: number
        timezone: number
  }
}

