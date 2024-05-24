import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from "sonner";
import ProductList from "./components/Admin/Product/ProductList";
import ProductAdd from "./components/Admin/Product/ProductAdd";
import ProductEdit from "./components/Admin/Product/ProductEdit";
import About from "./components/About/About";
import LayOutHome from "./components/layout/LayOutHome";
import LayOutAdmin from "./components/layout/LayOutAdmin";
function App() {
  return (
    <>
      <Toaster
        richColors
        position="top-right"
        duration={2000}
        visibleToasts={3}
        expand={true}
      />
      <Routes>
        <Route path="/" element={<LayOutHome/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="admin" element={<LayOutAdmin/>}>
          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
