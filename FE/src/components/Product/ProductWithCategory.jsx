import { useTanstackMutation, useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import DataIteration from "../UI/DataIteration";
import Product from "./Product";

const ProductWithCategory = () => {
  const { data: categoriesData, isLoading: categoriesLoading } = useTanstackQuery('categories');
  const { data: productsData, isLoading: productsLoading } = useTanstackQuery('products');
  const { mutate, isPending } = useTanstackMutation({
    path: `cart/add-item`,
    action: "CREATE",
  });

  if (categoriesLoading || productsLoading) return <p>Loading...</p>;

  // Filter categories with products
  const categoriesWithProducts = categoriesData.reduce((acc, category) => {
    const products = productsData.filter(product => product?.category?._id === category?._id);
    if (products.length > 0) {
      acc.push({
        ...category,
        products
      });
    }
    return acc;
  }, []);

  return (
    <div className="container-x mx-auto">
      {categoriesWithProducts.map(category => (
        <div key={category._id} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            <DataIteration data={category.products} startLength={0} endLength={category.products.length}>
              {({ data: product }) => (
                <div key={product._id} data-aos="fade-up">
                  <Product

                    product={product}
                    mutate={mutate}
                    isPending={isPending}
                  /></div>
              )}
            </DataIteration>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductWithCategory;
