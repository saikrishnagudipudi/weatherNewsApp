import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  city: string;
  temp: number;
  condition: string;
  wind: string;
  time: string;
  icon: any;
  onTomorrowPress: () => void;
  onWeekPress: () => void;
}

const WeatherCard: React.FC<Props> = ({
  city,
  temp,
  condition,
  wind,
  time,
  icon,
  onTomorrowPress,
  onWeekPress,
}) => {
  const gradientColors: any = {
    Sunny: ['#fbd786', '#f7797d'],
    Rainy: ['#89f7fe', '#66a6ff'],
    Cloudy: ['#d7d2cc', '#304352'],
    Snowy: ['#e0eafc', '#cfdef3'],
    Storm: ['#0052D4', '#4364F7'],
    Default: ['#8EC5FC', '#E0C3FC'],
  };

  const getColors = (cond: string) => gradientColors[cond] || gradientColors.Default;

  return (
    <LinearGradient colors={getColors(condition)} style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.temp}>{temp}°</Text>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.wind}>Wind: {wind}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onTomorrowPress}>
          <Text style={{color:"grey", fontWeight:"600"}}>Tomorrow →</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onWeekPress}>
          <Text style={{color:"grey", fontWeight:"600"}}>Week →</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
    justifyContent:"center",
    alignSelf:"center"
  },
  city: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#eee',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    width: 60,
    height: 60,
    marginVertical: 10,
  },
  condition: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  wind: {
    fontSize: 12,
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export default WeatherCard;
