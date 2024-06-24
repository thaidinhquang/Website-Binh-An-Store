
import { useTanstackMutation, useTanstackQuery } from '../../common/hooks/useTanstackQuery';
import ViewMoreTitle from '../UI/ViewMoreTitle';
import Product from './Product';

const ProductNew = () => {
  const { data, isLoading } = useTanstackQuery('products', {
    limit: 4,
  });
  const { mutate, isPending } = useTanstackMutation(`cart/add-item`, 'CREATE');
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="products-page-wrapper w-full">
      <div className="container-x mx-auto">
        <div className="best-sallers-section mb-8">
          <ViewMoreTitle
            seeMoreUrl="/all-products"
            categoryTitle="Sản Phẩm Mới"
          />
        </div>
        <div className="w-full lg:flex lg:space-x-5">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-40">
              {data?.docs?.length > 0 ? data.docs.map((product, index) => (
                <Product key={product._id} product={product} mutate={mutate} isPending={isPending} />
              )) : <p>Không có sản phẩm nào</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
