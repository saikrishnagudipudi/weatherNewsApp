import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import { getWeatherByCoords } from '../services/WeatherService';
import { getNews } from '../services/NewsService';
import { AppContext } from '../context/AppContext';
import WeatherCard from '../components/WeatherCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const {
    unit,
    setTemperature,
    setWeatherCondition,
    temperature,
    categories,
  } = useContext(AppContext);

  const [weather, setWeather] = useState<any>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();

 const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
      return (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};



  const fetchData = useCallback(async () => {
    setLoading(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.warn('Location permission denied');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const weatherData:any = await getWeatherByCoords(latitude, longitude, unit);
      setWeather(weatherData);
       setLoading(false);

      const temperatureValue = weatherData?.main.temp;
      setTemperature(temperatureValue);
      setWeatherCondition(weatherData?.weather[0].main);

      const category = categories.length > 0 ? categories[0] : 'general';
      const filteredNews = await getNews('in', category, temperatureValue);
      setNews(filteredNews);
       setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  },
  (error) => {
    console.error('Geolocation error', error);
    setLoading(false);
  },
  {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000,
    forceRequestLocation: true,
    showLocationDialog: true,
  }
);
  }, [unit, setTemperature, setWeatherCondition, categories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const iconMap: Record<string, any> = {
    Sunny: require('../assets/sunny.png'),
    Cloudy: require('../assets/cloudy.png'),
    Rainy: require('../assets/rainy.png'),
    Storm: require('../assets/storm.png'),
    Snowy: require('../assets/snow.png'),
    Default: require('../assets/partly_cloudy.png'),
  };

  const getWeatherCondition = (main: string): string => {
    if (main === 'Clear') return 'Sunny';
    if (['Clouds', 'Mist', 'Fog', 'Haze'].includes(main)) return 'Cloudy';
    if (['Rain', 'Drizzle', 'Thunderstorm'].includes(main)) return 'Rainy';
    if (['Snow'].includes(main)) return 'Snowy';
    return 'Default';
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const weatherMain = weather?.weather[0]?.main || '';
  const condition = getWeatherCondition(weatherMain);
  const icon = iconMap[condition] || iconMap.Default;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradient}>
        <View style={styles.container}>
          {weather && (
            <WeatherCard
              city={weather.name}
              temp={Math.round(weather.main.temp)}
              condition={condition}
              wind={`${Math.floor(weather.wind.speed)} km/h`}
              time={new Date().toLocaleTimeString()}
              icon={icon}
              onTomorrowPress={() =>
                navigation.navigate('TomorrowForecastScreen', { city: weather.name })
              }
              onWeekPress={() =>
                navigation.navigate('WeeklyForecastScreen', { city: weather.name })
              }
            />
          )}

          <Text style={styles.newsHeading}>Top News</Text>

          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => Linking.openURL(item.url)}
                style={styles.newsCard}
              >
                <Text style={styles.newsTitle}>{item.title}</Text>
                {item.description ? (
                  <Text style={styles.newsDesc}>{item.description}</Text>
                ) : null}
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noNewsText}>No news available</Text>}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6a11cb',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a11cb',
  },
  newsHeading: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 30,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  newsCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  newsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  newsDesc: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
  },
  noNewsText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default HomeScreen;
