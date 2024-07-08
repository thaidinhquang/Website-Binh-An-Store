import { Link, useLocation, useNavigate } from "react-router-dom";

const Pageination = ({ data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const changePage = (newPage) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', newPage);
        navigate(`?${searchParams.toString()}`);
    };
    return (
        <>
            <nav aria-label="Page navigation example" className="flex justify-center mt-2">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                    {data?.hasPrevPage && <li>
                        <button onClick={() => changePage(data?.prevPage)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>}
                    {Array.from({ length: data?.totalPages }, (_, i) => (
                        <li key={i}>
                            <button
                                onClick={() => changePage(i + 1)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${data?.page === i + 1 ? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    {data?.hasNextPage && <li>
                        <button onClick={() => changePage(data?.nextPage)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only" disabled={!data?.hasNextPage}>Next</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </li>}
                </ul>
            </nav>
        </>
    );
}

export default Pageination