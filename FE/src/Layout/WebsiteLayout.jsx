import Footer from "../home/Footer";
import Header from "../home/Header";
import { Outlet } from "react-router-dom";
// import '../assets/style.css'
const WebsiteLayOut = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayOut;
