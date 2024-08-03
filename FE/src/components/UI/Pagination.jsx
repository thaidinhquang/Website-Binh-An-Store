import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ data }) => {
  if (!data || !data.totalPages) return null;

  const { page, totalPages, prevPage, nextPage } = data;

  return (
    <nav className="flex justify-center mt-4">
      <div className="inline-flex">
        {prevPage && (
          <Link to={`?page=${prevPage}`} className="px-3 py-2 mx-1 text-gray-700 bg-white rounded-md">
            Trước
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Link
            key={pageNumber}
            to={`?page=${pageNumber}`}
            className={`px-3 py-2 mx-1 ${
              pageNumber === page ? 'text-white bg-blue-500' : 'text-gray-700 bg-white'
            } rounded-md`}
          >
            {pageNumber}
          </Link>
        ))}
        {nextPage && (
          <Link to={`?page=${nextPage}`} className="px-3 py-2 mx-1 text-gray-700 bg-white rounded-md">
            Sau
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;