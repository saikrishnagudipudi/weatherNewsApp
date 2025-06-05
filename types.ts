export type Unit = 'metric' | 'imperial';

export interface AppContextType {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  categories: string[];
  setCategories: (cats: string[]) => void;
}
