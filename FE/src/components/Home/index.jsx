
import ProductNew from "../Product/ProductNew"
import Banner from "./Banner"
import BrandSection from "./BrandSection"
import CampaignCountDown from "./CampaignCountDown"

const Home = () => {
  return (
    <div>
    <Banner className="mb-[60px]" />
    <ProductNew/>
    <BrandSection className="brand-section-wrapper mb-[60px]"/>
    <CampaignCountDown  className="mb-[60px]"
    lastDate="20234-10-10 4:00:00"/>
    </div>
  )
}

export default Home
