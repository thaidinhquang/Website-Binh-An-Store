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
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-black dark:text-black mb-6">Danh Sách Yêu Thích</h1>
            <p className="text-xl text-gray-800 dark:text-black-300 mb-4">{data.totalDocs || 0} sản phẩm</p>
            <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {!data?.docs?.length ? (
                    <p className="text-lg text-gray-500 dark:text-gray-400">Không có sản phẩm nào</p>
                ) : (
                    data.docs.map((product) => (
                        <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105" key={product._id}>
                            <Link to={'/detail/' + product._id}>
                                <div className="relative w-full h-48">
                                    <img className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-110" 
                                         src={product.image || 'https://media.istockphoto.com/id/1055079680/vector/black-linear-photo-camera-like-no-image-available.jpg?s=612x612&w=0&k=20&c=P1DebpeMIAtXj_ZbVsKVvg-duuL0v9DlrOZUvPG6UJk='} 
                                         alt={product.name} />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col justify-between flex-grow">
                                <Link to={'/detail/' + product._id} className="text-lg font-semibold text-black dark:text-black hover:text-blue-600 transition-colors">
                                    {product.name}
                                </Link>
                                <button onClick={() => removeFromWishlist({ productId: product._id })} aria-label="close" className="mt-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                                    Xóa khỏi danh sách
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Pageination data={data} />
        </div>
    );
}

export default Wishlist;