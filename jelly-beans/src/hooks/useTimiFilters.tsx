import { useMemo } from 'react';
import { JellyBean, Color, CombinationItem } from '../types/jellyBean';

export function useTimiFilters(
  beans: JellyBean[],
  colors: Color[],
  combinations: CombinationItem[]
) {
  const orangeColorIds = useMemo(() => {
    const ids = new Set(
      colors
        .filter((c) => c.colorDescription.toLowerCase().includes('orange'))
        .map((c) => c.colorId.toLowerCase())
    );
    return ids;
  }, [colors]);

  const orangeBeans = useMemo(() => {
    return beans.filter(
      (bean) => bean.ColorGroup && orangeColorIds.has(bean.ColorGroup.toLowerCase())
    );
  }, [beans, orangeColorIds]);

  const orangeBeanNames = useMemo(() => {
    return new Set(
      orangeBeans
        .map((bean) => bean.FlavorName?.toLowerCase().trim())
        .filter(Boolean) as string[]
    );
  }, [orangeBeans]);

  const timiCombinations = useMemo(() => {
    return combinations.filter((combo) => {
      const tagString = (combo.TagSerialized || '').toLowerCase();
      const namesArray = Array.from(orangeBeanNames);
        for (let i = 0; i < namesArray.length; i++) {
        if (tagString.includes(namesArray[i])) return true;
        }
      return false;
    });
  }, [combinations, orangeBeanNames]);

  return { orangeBeans, timiCombinations };
}