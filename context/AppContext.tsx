import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
  unit: 'metric' | 'imperial';
  setUnit: (unit: 'metric' | 'imperial') => void;
  weatherCondition: string;
  setWeatherCondition: (condition: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  categories: any;
  setCategories: (categories: any) => void;
}

export const AppContext = createContext<AppContextProps>({
  unit: 'metric',
  setUnit: () => {},
  weatherCondition: '',
  setWeatherCondition: () => {},
  temperature: 0,
  setTemperature: () => {},
  categories: ['general'],  // default category
  setCategories: () => {},
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weatherCondition, setWeatherCondition] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>(['general']);

  return (
    <AppContext.Provider
      value={{
        unit,
        setUnit,
        weatherCondition,
        setWeatherCondition,
        temperature,
        setTemperature,
        categories,
        setCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
