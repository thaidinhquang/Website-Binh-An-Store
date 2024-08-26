import { ToastContainer } from "react-toastify";
import Router from "./routes";

function App() {
  return (
    <>
      <Router />
      <ToastContainer
        className="w-full max-w-full break-words"
        toastClassName="max-h-24 overflow-y-auto truncate whitespace-nowrap"
        newestOnTop={true}
        position="top-center"
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
