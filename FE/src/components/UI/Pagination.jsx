import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const changePage = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', newPage);
        navigate(`?${searchParams.toString()}`);
    };

    if (!data || data.totalPages <= 1) return null;

    const currentPage = data.page;
    const totalPages = data.totalPages;

    const getPageNumbers = () => {
        const delta = 1; // Số trang hiển thị ở hai bên trang hiện tại
        const range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift("...");
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...");
        }

        range.unshift(1);
        if (totalPages !== 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => data.hasPrevPage && changePage(data.prevPage)}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${!data.hasPrevPage && 'opacity-50 cursor-not-allowed'}`}
                    disabled={!data.hasPrevPage}
                >
                    Trước
                </button>
                <button
                    onClick={() => data.hasNextPage && changePage(data.nextPage)}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${!data.hasNextPage && 'opacity-50 cursor-not-allowed'}`}
                    disabled={!data.hasNextPage}
                >
                    Sau
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{data.limit * (currentPage - 1) + 1}</span> đến <span className="font-medium">{Math.min(data.limit * currentPage, data.totalDocs)}</span> trong <span className="font-medium">{data.totalDocs}</span> kết quả
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => data.hasPrevPage && changePage(data.prevPage)}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${!data.hasPrevPage && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!data.hasPrevPage}
                        >
                            <span className="sr-only">Trước</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {getPageNumbers().map((pageNumber, index) => (
                            pageNumber === "..." ? (
                                <span key={index} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => changePage(pageNumber)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNumber === currentPage
                                        ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                        }`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        ))}
                        <button
                            onClick={() => data.hasNextPage && changePage(data.nextPage)}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${!data.hasNextPage && 'opacity-50 cursor-not-allowed'}`}
                            disabled={!data.hasNextPage}
                        >
                            <span className="sr-only">Sau</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </nav>
    );
}

export default Pagination;