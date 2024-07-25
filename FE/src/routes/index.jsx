import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ProductList from "../components/Admin/Product/ProductList";
import About from "../components/About/About";
import CartPage from "../components/CartPage";
import SingleProduct from "../components/SingleProduct/SingleProduct";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import CategorytList from "../components/Admin/Category/CategoryList";
import UserList from "../components/Admin/Users/UserList";
import CategorytForm from "../components/Admin/Category/CategoryForm";
import ProductForm from "../components/Admin/Product/ProductForm";
import AllProductPage from "../components/Product/AllProductPage";
import UserForm from "../components/Admin/Users/UserForm";
import SuccessMessage from "../components/CheckoutPage/SuccessMessage";
import Statistics from "../components/Admin/Stats";
import NotfoundPage from "../components/layout/Notfound";
import { Profile } from "../components/Profile/Profile";
import UserProfile from "../components/Profile/User/UserProfile";
import Address from "../components/Profile/Address/Address";
import Orders from "../components/Profile/Order/Orders";
import ChangePassword from "../components/Profile/ChangePassword/ChangePassword";
import UserEdit from "../components/Profile/User/UserEdit";
import LayoutWebsite from "../components/layout/Website";
import LayoutAdmin from "../components/layout/Admin";
import { AdminRoute, LoginRoute } from "./PrivateRoute";
import AttributeList from "../components/Admin/Attribute/AttributeList";
import AttributeAdd from "../components/Admin/Attribute/AttributeAdd";
import AttributeAddValue from "../components/Admin/Attribute/AttributeAddValue";
import AttributeEdit from "../components/Admin/Attribute/AttributeEdit";
import AttributeEditValue from "../components/Admin/Attribute/AttributeEditValue";
import AttributeDetails from "../components/Admin/Attribute/AttributeDetails";
import BrandList from "../components/Admin/Brand/BrandList";
import BrandForm from "../components/Admin/Brand/BrandForm";
import OrderDetail from "../components/Profile/Order/OrderDetail";
import OrderAdmin from "../components/Admin/order/Orders";
import DetailOrder from './../components/Admin/order/DetailOrder';
import AllBlogPage from "../components/Blog/AllBlogPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<SingleProduct />} />
          <Route path="about" element={<About />} />
          <Route
            path="cart"
            element={
              <LoginRoute>
                <CartPage />
              </LoginRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <LoginRoute>
                <CheckoutPage />
              </LoginRoute>
            }
          />
          <Route path="shop" element={<AllProductPage />} />
          <Route path="blogs" element={<AllBlogPage />} />
          <Route
            path="/profile"
            element={
              <LoginRoute>
                <Profile />
              </LoginRoute>
            }
          >
            <Route path="" element={<UserProfile />} />
            <Route path="address" element={<Address />} />
            <Route path="orders">
              <Route index element={<Orders />} />
              <Route path="detail/:id" element={<OrderDetail />} />
            </Route>
            <Route path="edit" element={<UserEdit />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route
          path="checkoutsuccess"
          element={
            <LoginRoute>
              <SuccessMessage />
            </LoginRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <LayoutAdmin />
            </AdminRoute>
          }
        >
          <Route index element={<Statistics />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductForm />} />
            <Route path="edit/:id" element={<ProductForm />} />
            <Route path="detail/:id" element={<ProductForm />} />
          </Route>
          <Route path="categories">
            <Route index element={<CategorytList />} />
            <Route path="add" element={<CategorytForm />} />
            <Route path="edit/:id" element={<CategorytForm />} />
          </Route>
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="add" element={<UserForm />} />
            <Route path="edit/:id" element={<UserForm />} />
          </Route>
          <Route path="orders">
            <Route index element={<OrderAdmin />} />
            <Route path=":id" element={<DetailOrder />} />
          </Route>
          <Route path="attribute">
            <Route index element={<AttributeList />} />
            <Route path="add" element={<AttributeAdd />} />
            <Route path="add/:id/value" element={<AttributeAddValue />} />
            <Route path="edit/:id" element={<AttributeEdit />} />
            <Route path="edit/:id/value" element={<AttributeEditValue />} />
            <Route path="detail/:id" element={<AttributeDetails />} />
          </Route>
          <Route path="brands">
            <Route index element={<BrandList />} />
            <Route path="add" element={<BrandForm />} />
            <Route path="edit/:id" element={<BrandForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
};

export default Router;