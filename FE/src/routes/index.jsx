import { useEffect } from "react";
import { useLocation, Route, Routes } from "react-router-dom";
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
import ChangePassword from "../components/Profile/ChangePassword/ChangePassword";
import UserEdit from "../components/Profile/User/UserEdit";
import LayoutWebsite from "../components/layout/Website";
import LayoutAdmin from "../components/layout/Admin";
import { AdminRoute, LoginRoute } from "./PrivateRoute";
import BrandList from "../components/Admin/Brand/BrandList";
import BrandForm from "../components/Admin/Brand/BrandForm";
import OrderAdmin from "../components/Admin/order/Orders";
import DetailOrder from "./../components/Admin/order/DetailOrder";

import Wishlist from "../components/Wishlist/Wishlist";

import OrderProfile from "../components/Profile/Order/Orders";
import DetailOrderUser from "../components/Profile/Order/DetailOrder";
import ProductReviews from "../components/Reviews/SingleProduct";
import DetailBlogPage from "../components/Blog/DetailBlogPage";
import AllBlogPage from "../components/Blog/AllBlogPage";
import BlogList from "../components/Admin/Blog/BlogList";
import BlogForm from "../components/Admin/Blog/BlogForm";
import BlogEdit from "../components/Admin/Blog/BlogEdit";
import ReviewList from "../components/Admin/Review/ReviewForm";
import DetailList from "../components/Admin/Detail/DetailList";
import ContactPage from "../components/Contact/ContactPage";
import FeedbackList from "../components/Admin/Feedback/FeedbackList";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<SingleProduct />} />
          <Route path="about" element={<About />} />
          <Route
            path="review/:id"
            element={
              <LoginRoute>
                {" "}
                <ProductReviews />{" "}
              </LoginRoute>
            }
          />
          <Route path="blogs" element={<AllBlogPage />} />
          <Route path="/blogs/:id" element={<DetailBlogPage />} />
          <Route
            path="cart"
            element={
              <LoginRoute>
                <CartPage />
              </LoginRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <LoginRoute>
                <Wishlist />
              </LoginRoute>
            }
          />
          <Route
            path="contact"
            element={
                <ContactPage />
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
              <Route index element={<OrderProfile />} />
              <Route path=":id" element={<DetailOrderUser />} />
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
          <Route path="feedback">
            <Route index element={<FeedbackList />} />
          </Route>
          <Route path="review">
            <Route index element={<ReviewList />} />
          </Route>

          <Route path="detail">
            <Route index element={<DetailList />} />
          </Route>
          <Route path="brands">
            <Route index element={<BrandList />} />
            <Route path="add" element={<BrandForm />} />
            <Route path="edit/:id" element={<BrandForm />} />
          </Route>
          <Route path="blogs">
            <Route index element={<BlogList />} />
            <Route path="add" element={<BlogForm />} />
            <Route path="edit/:id" element={<BlogEdit />} />
          </Route>
        </Route>
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
};

export default Router;
