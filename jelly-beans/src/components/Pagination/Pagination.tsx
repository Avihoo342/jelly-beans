import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="page-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}