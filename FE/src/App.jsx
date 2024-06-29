import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductList from "./components/Admin/Product/ProductList";
import About from "./components/About/About";
import LayOutHome from "./components/layout/LayOutHome";
import LayOutAdmin from "./components/layout/LayOutAdmin";
import Login from "./components/Auth/Login";
import CartPage from "./components/CartPage";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import CategorytList from "./components/Admin/Category/CategoryList";
import Signup from "./components/Auth/Signup";
import UserList from "./components/Admin/Users/UserList";
import CategorytForm from "./components/Admin/Category/CategoryForm";
import ProductForm from "./components/Admin/Product/ProductForm";
import AllProductPage from "./components/Product/AllProductPage";
import UserForm from "./components/Admin/Users/UserForm";
import { ToastContainer } from 'react-toastify'
import SuccessMessage from "./components/CheckoutPage/SuccessMessage";
import Orders from "./components/Admin/order/Orders";

function App() {
  return (
    <>
      <ToastContainer limit={3} newestOnTop={true} position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<LayOutHome />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<SingleProduct />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="all-products" element={<AllProductPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="checkoutsuccess" element={<SuccessMessage />} />
        <Route path="/admin" element={<LayOutAdmin />}>
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="trash" element={<ProductList />} />
            <Route path="add" element={<ProductForm />} />
            <Route path="edit/:id" element={<ProductForm />} />
          </Route>
          <Route path="categories">
            <Route index element={<CategorytList />} />
            <Route path="trash" element={<CategorytList />} />
            <Route path="add" element={<CategorytForm />} />
            <Route path="edit/:id" element={<CategorytForm />} />
          </Route>
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="trash" element={<UserList />} />
            <Route path="add" element={<UserForm />} />
            <Route path="edit/:id" element={<UserForm />} />
          </Route>
          <Route path="orders">
            <Route index element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
