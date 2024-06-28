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
import UserEdit from "./components/Admin/Users/UserEdit";
import MyComponent from "./components/MyComponent";
import CategorytForm from "./components/Admin/Category/CategoryForm";
import ProductForm from "./components/Admin/Product/ProductForm";
import AllProductPage from "./components/Product/AllProductPage";
import { Profile } from "./components/Profile/Profile";
import UserProfile from "./components/Profile/User/UserProfile";
import Address from "./components/Profile/Address/Address";
import Orders from "./components/Profile/Order/Orders";
import ChangePassword from "./components/Profile/ChangePassword/ChangePassword";


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
          <Route path="/profile" element={<Profile />}>
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="address" element={<Address />} />
            <Route path="orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>


        <Route path="/test" element={<MyComponent />} />
        <Route path="/admin" element={<LayOutAdmin />}>

          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductForm />} />
            <Route path="edit/:id" element={<ProductForm />} />
          </Route>
          <Route path="category">
            <Route index element={<CategorytList />} />
            <Route path="add" element={<CategorytForm />} />
            <Route path="edit/:id" element={<CategorytForm />} />
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
