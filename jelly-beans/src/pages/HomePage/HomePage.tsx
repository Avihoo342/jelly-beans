import React, { useEffect, useReducer, useMemo, useCallback } from 'react';
import { JellyBean } from '../../types/jellyBean';
import { fetchJellyBeans } from '../../api/jellyBeans';
import JellyBeanCard from '../../components/JellyBeanCard/JellyBeanCard';
import JellyBeanTable from '../../components/JellyBeanTable/JellyBeanTable';
import Pagination from '../../components/Pagination/Pagination';
import { getCache, setCache } from '../../utils/cacheService';
import Filters from '../../helper/Filters';
import SortControl from '../../helper/SortControl';

import './HomePage.css';
import ViewToggle from '../../helper/ViewToggle';
const PAGE_SIZE = 8;
const CACHE_KEY = 'jellyBeans';
const CACHE_TTL_MS = 5 * 60 * 1000;

type SortOption = 'nameAsc' | 'nameDesc' | 'group';
type ViewMode = 'grid' | 'table';

type State = {
  beans: JellyBean[];
  loading: boolean;
  error: string | null;
  filters: Record<string, boolean>;
  sortBy: SortOption;
  view: ViewMode;
  page: number;
};

type Action =
  | { type: 'SET_DATA'; beans: JellyBean[] }
  | { type: 'ERROR'; error: string }
  | { type: 'SET_FILTER'; key: string; value: boolean }
  | { type: 'SET_SORT'; sortBy: SortOption }
  | { type: 'TOGGLE_VIEW' }
  | { type: 'SET_PAGE'; page: number };

const initialFilters = {
  GlutenFree: false,
  SugarFree: false,
  Seasonal: false,
  Kosher: false,
};

const initialState: State = {
  beans: [],
  loading: true,
  error: null,
  filters: initialFilters,
  sortBy: 'nameAsc',
  view: 'grid',
  page: 1,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, beans: action.beans, loading: false, error: null };
    case 'ERROR':
      return { ...state, error: action.error, loading: false };
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
        page: 1,
      };
    case 'SET_SORT':
      return { ...state, sortBy: action.sortBy, page: 1 };
    case 'TOGGLE_VIEW':
      return { ...state, view: state.view === 'grid' ? 'table' : 'grid' };
    case 'SET_PAGE':
      return { ...state, page: action.page };
    default:
      return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { beans, loading, filters, sortBy, view, page } = state;

  useEffect(() => {
    const cached = getCache<JellyBean[]>(CACHE_KEY);
    if (cached) {
      dispatch({ type: 'SET_DATA', beans: cached });
      return;
    }
    fetchJellyBeans(50, 0)
      .then(res => {
        dispatch({ type: 'SET_DATA', beans: res.data });
        setCache(CACHE_KEY, res.data, CACHE_TTL_MS);
      })
      .catch(err => dispatch({ type: 'ERROR', error: err.message || 'Fetch failed' }));
  }, []);

  const filtered = useMemo(() => {
    return beans.filter(bean =>
      Object.entries(filters).every(([k, v]) => !v || (bean as any)[k])
    );
  }, [beans, filters]);

  const sorted = useMemo(() => {
    return filtered.slice().sort((a, b) => {
      switch (sortBy) {
        case 'nameAsc': return a.FlavorName.localeCompare(b.FlavorName);
        case 'nameDesc': return b.FlavorName.localeCompare(a.FlavorName);
        case 'group': return a.GroupNameSerialized.localeCompare(b.GroupNameSerialized);
        default: return 0;
      }
    });
  }, [filtered, sortBy]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const onFilterChange = useCallback((key: string, val: boolean) => {
    dispatch({ type: 'SET_FILTER', key, value: val });
  }, []);
  const onSortChange = useCallback((v: SortOption) => {
    dispatch({ type: 'SET_SORT', sortBy: v });
  }, []);
  const onViewToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE_VIEW' });
  }, []);
  const onPageChange = useCallback((v: number) => {
    dispatch({ type: 'SET_PAGE', page: v });
  }, []);

  return (
    <div className="homepage-container">
      <header>
        <h1>🍬 Jelly Beans</h1>
        <ViewToggle view={view} onToggle={onViewToggle} />
      </header>

      <div className="controls">
        <Filters filters={filters} onChange={onFilterChange} />
        <SortControl sortBy={sortBy} onChange={onSortChange} />
      </div>

      {loading ? <div className="loader" /> :
        paginated.length === 0 ? <p>No beans match your filters.</p> :
        view === 'grid' ? (
          <div className="grid-view">
            {paginated.map(b => <JellyBeanCard key={b.BeanId} bean={b} />)}
          </div>
        ) : (
          <JellyBeanTable beans={paginated} />
        )
      }

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}