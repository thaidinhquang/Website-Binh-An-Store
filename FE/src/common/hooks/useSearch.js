import { useNavigate } from "react-router-dom";

export const useHookSearch = () => {
    const navigate = useNavigate();
    const search = (data, path) => {
        const query = new URLSearchParams();
        for (const key in data) {
            query.append(key, data[key]);
        }
        query.set('page', 1);
        navigate(`${path}?${query.toString()}`);
    }

    return search;
}