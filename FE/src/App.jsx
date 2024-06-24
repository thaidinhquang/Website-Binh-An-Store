import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from "sonner";
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
import MyComponent from "./components/MyComponent";
import CategorytForm from "./components/Admin/Category/CategoryForm";
import ProductForm from "./components/Admin/Product/ProductForm";
import AllProductPage from "./components/Product/AllProductPage";
import UserForm from "./components/Admin/Users/UserForm";


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
          <Route path="all-products" element={<AllProductPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/test" element={<MyComponent />} />
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
