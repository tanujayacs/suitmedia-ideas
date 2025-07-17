import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages: number[] = [];

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    pages.push(1);
    if (start > 2) pages.push(-1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push(-2);
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-15">
      <button onClick={() => onPageChange(1)}>{'«'}</button>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>{'<'}</button>
      {getPageNumbers().map((page, i) => (
        <button
          key={i}
          disabled={page < 0}
          onClick={() => page > 0 && onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage ? 'bg-orange text-white' : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          {page < 0 ? '...' : page}
        </button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>{'>'}</button>
      <button onClick={() => onPageChange(totalPages)}>{'»'}</button>
    </div>
  );
};

export default Pagination;
