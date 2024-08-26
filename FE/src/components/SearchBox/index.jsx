import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHookSearch } from "../../common/hooks/useSearch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBox({ className, type }) {
  const form = useForm();
  const useSearch = useHookSearch();

  const handleChange = (data) => {
    const newData = { ...form.getValues(), [data.name]: data.value };
    useSearch(newData, '/shop');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newData = form.getValues();
    useSearch(newData, '/shop');
  };

  useEffect(() => {
    form.reset({ name: '' });
  }, [form]);

  return (
    <div className={`w-full h-full flex items-center border border-gray-300 rounded-md bg-white shadow-md ${className || ""}`}>
      <div className="flex-1 h-full">
        <form action="#" className="h-full" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input w-full h-full px-4 border-none rounded-l-md focus:outline-none"
            placeholder="Tìm kiếm sản phẩm..."
            {...form.register('name')}
            onChange={(e) => handleChange(e.target)}
          />
        </form>
      </div>
      <button
        className={`w-[50px] h-full flex items-center justify-center text-white rounded-r-md ${type === 3 ? 'bg-blue-600' : 'bg-gray-500'}`}
        type="submit"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}