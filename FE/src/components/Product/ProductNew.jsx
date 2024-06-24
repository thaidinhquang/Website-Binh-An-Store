
import { useTanstackMutation, useTanstackQuery } from '../../common/hooks/useTanstackQuery';
import ViewMoreTitle from '../UI/ViewMoreTitle';
import Product from './Product';
import DataIteration from '../UI/DataIteration'; // Assuming DataIteration component is in the same directory

const ProductNew = () => {
  const { data, isLoading } = useTanstackQuery('products');
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
              <DataIteration  data={data} startLength={0} endLength={4}>
                {({ data: product }) => (
                <div  key={product._id}  data-aos="fade-up"  >
                <Product
               
                product={product}
                mutate={mutate}
                isPending={isPending}
              />
                </div>
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
