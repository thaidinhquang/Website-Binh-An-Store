import { ToastContainer } from "react-toastify";
import Router from "./routes";

function App() {
  return (
    <>
      <Router />
      <ToastContainer
        newestOnTop={true}
        position="top-right"
        autoClose={2000}
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
