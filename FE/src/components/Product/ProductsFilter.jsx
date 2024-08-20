import { Range } from "react-range";
import Checkbox from "../UI/Checkbox";
import { useTanstackQuery } from "../../common/hooks/useTanstackQuery";
import { useLocation, useNavigate } from "react-router-dom";
const ProductsFilter = () => {
  const { data, isLoading } = useTanstackQuery('categories', {}, true);  
  const location = useLocation();
  const navigate = useNavigate();
  const checkIsCategory = (id) => {
    return location.search.includes(id);
  };
  const changeCategory = (newCategories) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('categories', newCategories);
    navigate(`?${searchParams.toString()}`);
  };
  const addCategory = (newCategoryId) => {
    const searchParams = new URLSearchParams(location.search);
    const categoriesParam = searchParams.get('categories');
    const categories = categoriesParam ? categoriesParam.split(',') : [];
    if (categories.includes(newCategoryId)) {
      const updatedCategories = categories.filter(id => id !== newCategoryId);
      searchParams.set('categories', updatedCategories.join(','));
    } else {
      categories.push(newCategoryId);
      searchParams.set('categories', categories.join(','));
    }
    navigate(`?${searchParams.toString()}`);
  };
  
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px]`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Danh mục
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {data?.length > 0 ? data.map((item) => (
                <li className="item flex justify-between items-center mb-5" key={item._id}>
                  <button className="flex space-x-[14px]">
                    <div>
                      <Checkbox
                        id={item._id}
                        checked={checkIsCategory(item._id)}
                        handleChange={() => changeCategory(item._id)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={item._id}
                        className="text-xs font-black font-400 capitalize"
                      >
                        {item.name}
                      </label>
                    </div>
                  </button>
                  <div onClick={() => addCategory(item._id)}>
                    <span className="cursor-pointer">
                      {!checkIsCategory(item._id) ? (
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
                      ) : (
                        <svg
                          width="10"
                          height="2"
                          viewBox="0 0 10 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="2" fill="#C4C4C4" />
                        </svg>
                      )}
                    </span>
                  </div>
                </li>)
              ) : <li>
                <p>Không tìm thấy danh mục</p>
              </li>}
            </ul>
          </div>
        </div>
        {/* <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <Range
              draggableTrack
              step={1}
              max={1000}
              min={0}
              values={volume}
              onChange={volumeHandler}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-full bg-qgray-border rounded-md"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="h-4 w-4 bg-qyellow rounded-full" />
              )}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Price: ${volume[0]} - ${volume[1]}
          </p>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Brands</h1>
          </div>
          <div className="filter-items">
            <ul>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="apple"
                      name="apple"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.apple}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="apple"
                      className="text-xs font-black font-400 capitalize"
                    >
                      apple
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="samsung"
                      name="samsung"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.samsung}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="samsung"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Samsung
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="walton"
                      name="walton"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.walton}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="walton"
                      className="text-xs font-black font-400 capitalize"
                    >
                      walton
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="oneplus"
                      name="oneplus"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.oneplus}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="oneplus"
                      className="text-xs font-black font-400 capitalize"
                    >
                      oneplus
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="vivo"
                      name="vivo"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.vivo}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vivo"
                      className="text-xs font-black font-400 capitalize"
                    >
                      vivo
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="oppo"
                      name="oppo"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.oppo}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="oppo"
                      className="text-xs font-black font-400 capitalize"
                    >
                      oppo
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="xiomi"
                      name="xiomi"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.xiomi}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="xiomi"
                      className="text-xs font-black font-400 capitalize"
                    >
                      xiomi
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="others"
                      name="others"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.others}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="others"
                      className="text-xs font-black font-400 capitalize"
                    >
                      others
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Storage</h1>
          </div>
          <div className="filter-items">
            <div className="flex space-x-[5px] flex-wrap">
              <span
                onClick={() => filterstorage("64GB")}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "64GB"
                    ? "bg-qyellow text-qblack border-none"
                    : " text-qgray "
                }`}
              >
                64GB
              </span>
              <span
                onClick={() => filterstorage("128GB")}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "128GB"
                    ? "bg-qyellow text-qblack border-none"
                    : " text-qgray "
                }`}
              >
                128GB
              </span>
              <span
                onClick={() => filterstorage("256GB")}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "256GB"
                    ? "bg-qyellow text-qblack border-none"
                    : " text-qgray "
                }`}
              >
                256GB
              </span>
              <span
                onClick={() => filterstorage("512GB")}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "512GB"
                    ? "bg-qyellow text-qblack border-none"
                    : " text-qgray "
                }`}
              >
                512GB
              </span>
              <span
                onClick={() => filterstorage("1024GB")}
                className={` font-400 border border-qgray-border text-xs px-[14px] py-[6px] cursor-pointer mb-[5px] ${
                  storage === "1024GB"
                    ? "bg-qyellow text-qblack border-none"
                    : " text-qgray "
                }`}
              >
                1024GB
              </span>
            </div>
          </div>
        </div>
        <div className="filter-subject-item pb-10 mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Sizes</h1>
          </div>
          <div className="filter-items">
            <ul>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeS"
                      name="sizeS"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.sizeS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeS"
                      className="text-xs font-black font-400 capitalize"
                    >
                      s
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeM"
                      name="sizeM"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.sizeM}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeM"
                      className="text-xs font-black font-400 capitalize"
                    >
                      M
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeXL"
                      name="sizeXL"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.sizeXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeXL"
                      className="text-xs font-black font-400 capitalize"
                    >
                      XL
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeXXL"
                      name="sizeXXL"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.sizeXXL}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeXXL"
                      className="text-xs font-black font-400 capitalize"
                    >
                      XXL
                    </label>
                  </div>
                </div>
              </li>
              <li className="item flex justify-between items-center mb-5">
                <div className="flex space-x-[14px] items-center">
                  <div>
                    <Checkbox
                      id="sizeFit"
                      name="sizeFit"
                      handleChange={(e) => checkboxHandler(e)}
                      checked={filters?.sizeFit}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sizeFit"
                      className="text-xs font-black font-400 capitalize"
                    >
                      Sliem Fit
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={filterToggleHandler}
          type="button"
          className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button> */}
      </div>
    </>
  );
}

export default ProductsFilter;