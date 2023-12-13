import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';

const AppRouter = () => {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </main>
  );
};

export default AppRouter;
