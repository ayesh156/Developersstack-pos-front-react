import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Customer from './components/Customer';
import Product from './components/Product';
import Order from './components/Order';
import Income from './components/Income';

function App() {

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className="navbar-brand">
              <img src="/icon1.png" alt="Logo" className='logo' />
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link" to={'/'}>Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={'/customer'}>Customer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/product'}>Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/order'}>Order</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/income'}>Income</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/product' element={<Product />} />
          <Route path='/order' element={<Order />} />
          <Route path='/income' element={<Income />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
