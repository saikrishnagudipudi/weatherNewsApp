import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';

const availableCategories = ['general', 'depressing', 'fear', 'winning'];

const SettingsScreen: React.FC = () => {
  const { unit, setUnit, categories, setCategories } = useContext(AppContext);

  const toggleCategory = (category: string, value: boolean) => {
    setCategories((prevCategories: string[]) => {
      if (value) {
        if (!prevCategories.includes(category)) {
          return [...prevCategories, category];
        }
        return prevCategories;
      } else {
        return prevCategories.filter((cat: string) => cat !== category);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Temperature Unit</Text>
      <Picker
        itemStyle={{ color:"#000"}}
        selectedValue={unit}
        dropdownIconColor={'#000'}
        onValueChange={(value) => setUnit(value)}
        style={{ height: 50, width: 200, color:"#000" }}
      >
        <Picker.Item label="Celsius" value="metric" />
        <Picker.Item label="Fahrenheit" value="imperial" />
      </Picker>

      <Text style={[styles.heading, { marginTop: 20, color:"#000" }]}>News Categories</Text>
      {availableCategories.map((category) => (
        <View key={category} style={styles.switchRow}>
          <Text style={{ textTransform: 'capitalize', color:"#000" }}>{category}</Text>
          <Switch
            value={categories.includes(category)}
            onValueChange={(value) => toggleCategory(category, value)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 18, fontWeight: 'bold', color:"#000" },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    alignItems: 'center',
  },
});

export default SettingsScreen;
