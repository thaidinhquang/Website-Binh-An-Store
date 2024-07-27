import { axiosGet } from "../../config/axios";

const fetchData = async () => {
    setIsLoading(true);
    const data = await axiosGet('/auth', token);
    setUser(data);
    setIsLoading(false);
};

export function UserProvider({ children }) {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetchData();
    }, [token]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}