import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./component/Navbar"
import Footer from "./component/Footer"
import Home from "./pages/Home"
import AboutPage from "./pages/AboutPage"
import ShopPage from "./pages/ShopPage"
import FeatursPage from "./pages/FeatursPage"
import TestimonialPage from "./pages/TestimonialPage"
import FaqPage from "./pages/Faqpage"
import ContectUsPage from "./pages/ContectUsPage"



import AdminHome from "./pages/Admin/AdminHome"

import AdminMaincategory from "./pages/Admin/maincategory/AdminMaincategory"
import AdminMaincategorycreate from "./pages/Admin/maincategory/AdminMaincategorycreate"
import AdminMaincategoryupdate from "./pages/Admin/maincategory/AdminMaincategoryupdate"

import AdminSubcategory from "./pages/Admin/subcategory/AdminSubcategory"
import AdminSubcategorycreate from "./pages/Admin/subcategory/AdminSubcategorycreate"
import AdminSubcategoryupdate from "./pages/Admin/subcategory/AdminSubcategoryupdate"

import AdminBrand from "./pages/Admin/brand/AdminBrand"
import AdminBrandcreate from "./pages/Admin/brand/AdminBrandcreate"
import AdminBrandupdate from "./pages/Admin//brand/AdminBrandupdate"

import AdminFeature from "./pages/Admin/feature/AdminFeature"
import AdminFeaturecreate from "./pages/Admin/feature/AdminFeaturecreate"
import AdminFeatureupdate from "./pages/Admin//feature/AdminFeatureupdate"

import AdminFaq from "./pages/Admin/faq/AdminFaq"
import AdminFaqcreate from "./pages/Admin/faq/AdminFaqcreate"
import AdminFaqupdate from "./pages/Admin//faq/AdminFaqupdate"

import AdminSetting from "./pages/Admin/setting/AdminSetting"

import AdminProduct from "./pages/Admin/product/AdminProduct"
import AdminProductcreate from "./pages/Admin/product/AdminProductcreate"
import AdminProductupdate from "./pages/Admin/product/AdminProductupdate"
import PrivacyPolicyPage from "./pages/Policies/PrivacyPolicyPage"
import RefundPolicyPage from "./pages/Policies/RefundPolicyPage"
import TermsConditionsPage from "./pages/Policies/TermsConditionsPage"
import ProductPage from "./pages/ProductPage"
import ErrorPage from "./pages/ErrorPage"
import SignupPage from "./pages/User/SignupPage"
import LoginPage from "./pages/User/LoginPage"
import ProfilePage from "./pages/User/ProfilePage"
import CartPage from "./pages/User/CartPage"
import CheckoutPage from "./pages/User/CheckoutPage"
import OrderConfirmation from "./pages/OrderConfirmation"
import AdminNewsletter from "./pages/Admin/newsletter/AdminNewsletter"
import AdminContactUs from "./pages/Admin/contactus/AdminContactUs"
import AdminContactUsShowpage from "./pages/Admin/contactus/AdminContactUsShowpage"
import AdminCheckout from "./pages/Admin/checkout/AdminCheckout"
import AdminCheckoutShowpage from "./pages/Admin/checkout/AdminCheckoutShowpage"
import AdminUser from "./pages/Admin/user/AdminUser"
import AdminUsercreate from "./pages/Admin/user/AdminUsercreate"
import AdminUserupdate from "./pages/Admin/user/AdminUserupdate"


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/featurs" element={<FeatursPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contectus" element={<ContectUsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/tc" element={<TermsConditionsPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {
          localStorage.getItem("login") ?
            <>

              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />

            </> : null
        }

        {
          localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
            <>

              <Route path="/admin" element={<AdminHome />} />

              <Route path="/admin/maincategory" element={<AdminMaincategory />} />
              <Route path="/admin/maincategory/create" element={<AdminMaincategorycreate />} />
              <Route path="/admin/maincategory/update/:id" element={<AdminMaincategoryupdate />} />

              <Route path="/admin/subcategory" element={<AdminSubcategory />} />
              <Route path="/admin/subcategory/create" element={<AdminSubcategorycreate />} />
              <Route path="/admin/subcategory/update/:id" element={<AdminSubcategoryupdate />} />

              <Route path="/admin/brand" element={<AdminBrand />} />
              <Route path="/admin/brand/create" element={<AdminBrandcreate />} />
              <Route path="/admin/brand/update/:id" element={<AdminBrandupdate />} />

              <Route path="/admin/feature" element={<AdminFeature />} />
              <Route path="/admin/feature/create" element={<AdminFeaturecreate />} />
              <Route path="/admin/feature/update/:id" element={<AdminFeatureupdate />} />


              <Route path="/admin/faq" element={<AdminFaq />} />
              <Route path="/admin/faq/create" element={<AdminFaqcreate />} />
              <Route path="/admin/faq/update/:id" element={<AdminFaqupdate />} />

              <Route path="/admin/setting" element={<AdminSetting />} />
              <Route path="/admin/newsletter" element={<AdminNewsletter />} />

              <Route path="/admin/contectus" element={<AdminContactUs />} />
              <Route path="/admin/contectus/show/:id" element={<AdminContactUsShowpage />} />

              <Route path="/admin/checkout" element={<AdminCheckout />} />
              <Route path="/admin/checkout/show/:id" element={<AdminCheckoutShowpage />} />

              <Route path="/admin/product" element={<AdminProduct />} />
              <Route path="/admin/produ ct/create" element={<AdminProductcreate />} />
              <Route path="/admin/product/update/:id" element={<AdminProductupdate />} />

              {
                localStorage.getItem("role") === "Super Admin" ?
                  <>
                    <Route path="/admin/user" element={<AdminUser />} />
                    <Route path="/admin/user/create" element={<AdminUsercreate />} />
                    <Route path="/admin/user/update/:id" element={<AdminUserupdate />} />

                  </> :null

             }

            </> : null
        }
        <Route path="*" element={<ErrorPage />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default App