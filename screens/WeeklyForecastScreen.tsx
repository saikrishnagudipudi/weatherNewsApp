// screens/WeeklyForecastScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const weeklyData = [
  { day: 'Monday', temp: 30, icon: require('../assets/sunny.png') },
  { day: 'Tuesday', temp: 28, icon: require('../assets/rainy.png') },
  { day: 'Wednesday', temp: 29, icon: require('../assets/cloudy.png') },
  { day: 'Thursday', temp: 31, icon: require('../assets/sunny.png') },
  { day: 'Friday', temp: 27, icon: require('../assets/storm.png') },
  { day: 'Saturday', temp: 26, icon: require('../assets/snow.png') },
  { day: 'Sunday', temp: 30, icon: require('../assets/sunny.png') },
];

const WeeklyForecastScreen = ({ route }: any) => {
  const { city } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Forecast - {city}</Text>
      <FlatList
        data={weeklyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.day}>{item.day}</Text>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.temp}>{item.temp}°</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color:"#000" },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  day: { flex: 1, fontSize: 16, color:"#000" },
  icon: { width: 40, height: 40 },
  temp: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 , color:"#000"},
});

export default WeeklyForecastScreen;
