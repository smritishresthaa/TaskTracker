import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from '../Login';
import Register from '../Register';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
