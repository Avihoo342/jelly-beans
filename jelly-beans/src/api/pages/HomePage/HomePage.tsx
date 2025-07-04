import { useEffect, useState, useMemo, useCallback } from 'react';
import './HomePage.css';
import { JellyBean } from '../../types/jellyBean';
import { fetchJellyBeans } from '../../jellyBeans';
import JellyBeanCard from '../../components/JellyBeanCard/JellyBeanCard';
import JellyBeanTable from '../../components/JellyBeanTable/JellyBeanTable';
import Pagination from '../../components/Pagination/Pagination';

const PAGE_SIZE = 8;

const initialFilters = {
  GlutenFree: false,
  SugarFree: false,
  Seasonal: false,
  Kosher: false,
};

type SortOption = 'nameAsc' | 'nameDesc' | 'group';

export default function HomePage() {
  const [beans, setBeans] = useState<JellyBean[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('nameAsc');
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchJellyBeans(1000, 0)
      .then((data) => {
        setBeans(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const filteredBeans = useMemo(() => {
    return beans.filter((bean) =>
      Object.entries(filters).every(
        ([key, value]) => !value || bean[key as keyof typeof filters]
      )
    );
  }, [beans, filters]);


  const sortedBeans = useMemo(() => {
    return [...filteredBeans].sort((a, b) => {
      if (sortBy === 'nameAsc') return a.FlavorName.localeCompare(b.FlavorName);
      if (sortBy === 'nameDesc') return b.FlavorName.localeCompare(a.FlavorName);
      if (sortBy === 'group') return a.GroupNameSerialized.localeCompare(b.GroupNameSerialized);
      return 0;
    });
  }, [filteredBeans, sortBy]);


  const paginatedBeans = useMemo(() => {
    const offset = (currentPage - 1) * PAGE_SIZE;
    return sortedBeans.slice(offset, offset + PAGE_SIZE);
  }, [sortedBeans, currentPage]);


  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleFilterChange = useCallback(
    (attr: keyof typeof filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
        ...prev,
        [attr]: e.target.checked,
      }));
      setCurrentPage(1);
    },
    []
  );

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  }, []);

  const toggleView = useCallback(() => {
    setView((prev) => (prev === 'grid' ? 'table' : 'grid'));
  }, []);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>🍬 All Jelly Beans</h1>
        <button className="toggle-view-btn" onClick={toggleView}>
          Switch to {view === 'grid' ? 'Table' : 'Grid'} View
        </button>
      </header>

      <section className="filters-section">
        <div className="filters">
          {Object.keys(filters).map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={filters[key as keyof typeof filters]}
                onChange={handleFilterChange(key as keyof typeof filters)}
              />
              {key}
            </label>
          ))}
        </div>

        <div className="sort">
          <label>
            Sort by:
            <select value={sortBy} onChange={handleSortChange}>
              <option value="nameAsc">Name A-Z</option>
              <option value="nameDesc">Name Z-A</option>
              <option value="group">Group</option>
            </select>
          </label>
        </div>
      </section>

      {loading ? (
        <div className="loader-container">
          <div className="loader" />
        </div>
      ) : paginatedBeans.length === 0 ? (
        <p>No beans match your filters.</p>
      ) : view === 'grid' ? (
        <div className="grid-view">
          {paginatedBeans.map((bean) => (
            <JellyBeanCard key={bean.BeanId} bean={bean} />
          ))}
        </div>
      ) : (
        <JellyBeanTable beans={paginatedBeans} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedBeans.length / PAGE_SIZE)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}