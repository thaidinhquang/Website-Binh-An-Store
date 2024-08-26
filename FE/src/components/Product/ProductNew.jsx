
import { useTanstackMutation, useTanstackQuery } from '../../common/hooks/useTanstackQuery';
import ViewMoreTitle from '../UI/ViewMoreTitle';
import Product from './Product';

const ProductNew = ({ related = '', category = '' }) => {
  return (
    <div className="products-page-wrapper w-full">
      <div className="container-x mx-auto">
        <div className="best-sallers-section mb-8">
          <ViewMoreTitle
            seeMoreUrl={"/shop?categories=" + category}
            categoryTitle={related ? 'Sản phẩm liên quan' : 'Sản phẩm mới'}
          />
        </div>
        <div className="w-full lg:flex lg:space-x-5">
          <div className="flex-1">
            <Product limit={4} related={related} className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-40'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
