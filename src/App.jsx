// ** Router Imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ** Layout Imports
import Layout from './layout/MainLayout';

// ** Pages Imports
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
