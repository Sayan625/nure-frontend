import './App.css';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Admin from './pages/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';
import PrivateRoutes from './components/PrivateRoutes';
import OrderDetail from './pages/OrderDetail';
import Order from './pages/Order';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Cart/> */}
        {/* <ContactUs/> */}
        <Routes>
          <Route element={<PrivateRoutes admin={false} />}>
            <Route path="/cart" element={<PageLayout page={<Cart />} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<PageLayout page={<Order/>} exact />} />
            <Route path="/orderhistory" element={<PageLayout page={<OrderHistory />} />} />
            <Route path="/orders/:id" element={<PageLayout page={<OrderDetail />} />} />
          </Route>
          <Route element={<PrivateRoutes admin={true} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/" element={<PageLayout page={<Home />} />} />
          <Route path="/contacts" element={<PageLayout page={<ContactUs />} />} />
          <Route path="/products" element={<PageLayout page={<Products />} />} exact />
          <Route path="/products/:id" element={<PageLayout page={<ProductDetails />} />} />
          <Route path="/login" element={<PageLayout page={<Login />} />} />
          <Route path="/signup" element={<PageLayout page={<SignUp/>} />} />
        </Routes>
        {/* <Home/> */}
        {/* <ProductDetails/> */}
        {/* <PageLayout/> */}
        {/* <Admin/> */}
      </Router>

    </div>
  );
}

export default App;
