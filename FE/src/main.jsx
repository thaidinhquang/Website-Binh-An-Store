import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import "react-toastify/ReactToastify.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/Auth/core/Auth.jsx";

const queryClient = new QueryClient()
AOS.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>,
)
