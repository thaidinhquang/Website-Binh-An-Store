import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from "sonner";
import ProductList from "./components/Admin/Product/ProductList";
import ProductAdd from "./components/Admin/Product/ProductAdd";
import ProductEdit from "./components/Admin/Product/ProductEdit";
import About from "./components/About/About";
import LayOutHome from "./components/layout/LayOutHome";
import LayOutAdmin from "./components/layout/LayOutAdmin";
import Login from "./components/Auth/Login";

import SingleProduct from "./components/SingleProduct/SingleProduct";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import CategorytList from "./components/Admin/Category/CategoryList";
import CategoryAdd from "./components/Admin/Category/CategoryAdd";
import CategorytEdit from "./components/Admin/Category/CategoryEdit";
import CartPage from "./components/CartPage/CartPage";
import Signup from "./components/Auth/SignUp";
import UserList from "./components/Admin/Users/UserList";
import UserEdit from "./components/Admin/Users/UserEdit";

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
        <Route path="/" element={<LayOutHome />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<SingleProduct />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/admin" element={<LayOutAdmin />}>
          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>
          <Route path="category">
            <Route index element={<CategorytList />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit/:id" element={<CategorytEdit />} />
          </Route>

          <Route path="users">
            <Route index element={<UserList />} />

            <Route path="edit/:id" element={<UserEdit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
