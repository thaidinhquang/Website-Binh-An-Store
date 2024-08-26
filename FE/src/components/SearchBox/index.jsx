export default function SearchBox({ className,type }) {
  return (
    <>
      <div
        className={`w-full h-full flex items-center  border border-qgray-border bg-white ${
          className || ""
        }`}
      >
        <div className="flex-1 bg-red-500 h-full">
          <form action="#" className="h-full">
            <input
              type="text"
              className="search-input"
              placeholder="Search Product..."
            />
          </form>
        </div>
      
        <button
          className={` w-[93px] h-full text-sm font-600  ${type===3?'bg-qh3-blue text-white':'search-btn'}`}
          type="button"
        >
          Search
        </button>
      </div>
    </>
  );
}
