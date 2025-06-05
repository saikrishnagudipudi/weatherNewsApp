import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const hourlyData = [
  { time: '6 AM', temp: 22, icon: require('../assets/sunny.png') },
  { time: '9 AM', temp: 25, icon: require('../assets/sunny.png') },
  { time: '12 PM', temp: 30, icon: require('../assets/sunny.png') },
  { time: '3 PM', temp: 32, icon: require('../assets/sunny.png') },
  { time: '6 PM', temp: 29, icon: require('../assets/cloudy.png') },
  { time: '9 PM', temp: 26, icon: require('../assets/cloudy.png') },
];

const TomorrowForecastScreen = ({ route }: any) => {
  const { city } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tomorrow's Forecast - {city}</Text>
      <FlatList
        data={hourlyData}
        numColumns={3}
        horizontal={false}
        contentContainerStyle={{justifyContent:'center', alignItems:"center", alignSelf:"center"}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.time}>{item.time}</Text>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.temp}>{item.temp}°</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' , justifyContent:"center", alignItems:"center"},
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color:"#000" },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    width: 100,
    elevation: 3,
    borderWidth:2,
    height: 130,
    marginBottom:10,
    alignSelf:"center",
    justifyContent:"center"
  },
  time: { fontSize: 14, color:"#000000"},
  icon: { width: 40, height: 40, marginVertical: 10 },
  temp: { fontSize: 16, fontWeight: '500', color:"#000000" },
});

export default TomorrowForecastScreen;
