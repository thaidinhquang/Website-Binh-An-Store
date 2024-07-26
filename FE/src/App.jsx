import { ToastContainer } from "react-toastify";
import Router from "./routes";

function App() {
  return (
    <>
      <Router />
      <ToastContainer
        limit={3}
        newestOnTop={true}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
