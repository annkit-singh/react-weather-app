// import { useState, useEffect } from 'react';

// interface Position {
//   lat: number;
//   lon: number;
// }

// const useGeolocation = () => {
//   const [position, setPosition] = useState<Position | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const getPosition = () => {
//       return new Promise<GeolocationPosition>((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       });
//     };

//     if (navigator.geolocation) {
//       getPosition()
//         .then((pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition({ lat: latitude, lon: longitude });
//         })
//         .catch(() => {
//           setError("Unable to retrieve location. Please allow location access.");
//         });
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return { position, error };
// };

// export default useGeolocation;




// src/hooks/useGeolocation.ts

import { useState, useEffect } from 'react';

interface Position {
  lat: number;
  lon: number;
}

const useGeolocation = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosition = () => {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    if (navigator.geolocation) {
      getPosition()
        .then((pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lon: longitude });
        })
        .catch(() => {
          setError("Unable to retrieve location. Please allow location access.");
        });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { position, error };
};

export default useGeolocation;

