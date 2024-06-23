// import {
//   useTanstackMutation,
//   useTanstackQuery,
// } from "../../common/hooks/useTanstackQuery";
// import DataIteration from "../UI/DataIteration";
// import Product from "./Product";

// // eslint-disable-next-line no-unused-vars
// const ProductWithCategory = ({ className }) => {
//     // const { data, isLoading } = useTanstackQuery('categories');
//   const { data, isLoading } = useTanstackQuery("products");

//   const { mutate, isPending } = useTanstackMutation(`cart/add-item`, "CREATE");
//   if (isLoading) return <p>Loading...</p>;
//   return (
//     <div>
      
//       <div className="w-full lg:flex lg:space-x-5">
//         <div className="flex-1">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-40">
//             <DataIteration data={data} startLength={0} endLength={3}>
//               {({ data: product }) => (
//                 <Product
//                   key={product._id}
//                   product={product}
//                   mutate={mutate}
//                   isPending={isPending}
//                 />
//               )}
//             </DataIteration>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductWithCategory;
