import { Link, useLocation } from "react-router-dom";
import { useTanstackMutation, useTanstackQuery } from '../../common/hooks/useTanstackQuery';
import Pageination from "../UI/Pagination";
import { useEffect } from "react";

const Wishlist = () => {
    const search = new URLSearchParams(useLocation().search);
    const page = search.get('page') || 1;
    const { data, refetch, isLoading } = useTanstackQuery('wishlist', { limit: 12, page });
    const { mutate: removeFromWishlist } = useTanstackMutation({ path: `wishlist/remove`, action: "CREATE" });
    useEffect(() => {
        refetch();
    }, [page]);
    if (isLoading) return <p>Đang tải...</p>;
    return (
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
            <div className="flex flex-col jusitfy-start items-start">
                <div>
                    <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>
                </div>
                <div className="mt-3">
                    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white dark:text-white">Favourites</h1>
                </div>
                <div className="mt-4">
                    <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{data.totalDocs} items</p>
                </div>
                <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-12">
                    {data.docs.map((product) => (
                        <div className="flex flex-col" key={product._id}>
                            <div className="relative">
                                <Link to={'/detail/' + product._id}>
                                    <img className="w-full h-[300px] object-cover" src={product.image || 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='} alt={product.name} />
                                </Link>
                                <button onClick={() => removeFromWishlist({productId: product._id})} aria-label="close" className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 dark:bg-white dark:text-gray-800 absolute p-1.5 bg-gray-800 text-white hover:text-gray-400">
                                    <svg className="fil-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <Link to={'/detail/' + product._id} className="flex justify-center items-center">
                                    <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white">{product.name}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <Pageination data={data} />
            </div>
        </div>
    );
}

export default Wishlist;