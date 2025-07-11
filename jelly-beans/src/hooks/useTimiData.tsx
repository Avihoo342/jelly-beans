import { useEffect, useState } from "react";
import { fetchColors, fetchCombinations, fetchJellyBeans } from "../api/jellyBeans";
import { Color, CombinationItem, JellyBean } from "../types/jellyBean";

type State = {
  beans: JellyBean[];
  colors: Color[];
  combinations: CombinationItem[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  beans: [],
  colors: [],
  combinations: [],
  loading: true,
  error: null,
};

export function useTimiData() {
  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [beansRes, colorsRes, combosRes] = await Promise.all([
          fetchJellyBeans(50, 0),
          fetchColors(),
          fetchCombinations(),
        ]);

        setState({
          beans: beansRes.data,
          colors: colorsRes.data,
          combinations: combosRes.data,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        setState((prev: any) => ({
          ...prev,
          loading: false,
          error: err.message || 'Failed to load data.',
        }));
      }
    };

    loadData();
  }, []);

  return state;
}