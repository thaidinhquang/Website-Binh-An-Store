// import { Range } from "react-range";
import Checkbox from "../UI/Checkbox";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";

const ProductsFilter = ({
  filters,
  checkboxHandler,
  className,
  filterToggle,
}) => {
  const { data, isLoading } = useTanstackQuery('categories');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Danh Mục</h1>
          </div>
          <div className="filter-items">
            <ul>
              {data?.map((category) => (
                <li key={category._id} className="item flex justify-between items-center mb-5">
                  <div className="flex space-x-[14px] items-center">
                    <div>
                      <Checkbox
                        id={category._id}
                        name={category.name}
                        handleChange={(e) => checkboxHandler(e)}
                        checked={filters[category.name]}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={category._id}
                        className="text-xs font-black font-400 capitalize"
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                  <div>
                    <span className="cursor-pointer">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect y="4" width="10" height="2" fill="#C4C4C4" />
                        <rect
                          x="6"
                          width="10"
                          height="2"
                          transform="rotate(90 6 0)"
                          fill="#C4C4C4"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default ProductsFilter;
