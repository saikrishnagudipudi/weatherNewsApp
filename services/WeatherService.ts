export const getWeatherByCoords = async (
  lat: number,
  lon: number,
  unit: 'metric' | 'imperial'
) => {
  try {
    const tempUnit = unit === 'metric' ? 'celsius' : 'fahrenheit';
    const windUnit = unit === 'metric' ? 'kmh' : 'mph';

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${14.3643}&longitude=${78.4558}&current_weather=true&temperature_unit=${tempUnit}&windspeed_unit=${windUnit}`
    );

    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'sivateja950@gmail.com',
        },
      }
    );
    const geoData = await geoRes.json();

    const cityName =
      geoData?.address?.city ||
      geoData?.address?.town ||
      geoData?.address?.village ||
      geoData?.address?.state ||
      'Unknown location';

    return {
      name: cityName,
      main: {
        temp: weatherData.current_weather.temperature,
      },
      wind: {
        speed: weatherData.current_weather.windspeed || 0,
      },
      weather: [
        {
          main: mapWeatherCodeToCondition(weatherData.current_weather.weathercode),
        },
      ],
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
};

const mapWeatherCodeToCondition = (code: number): string => {
  if ([0].includes(code)) return 'Clear';
  if ([1, 2, 3].includes(code)) return 'Clouds';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Clear';
};
