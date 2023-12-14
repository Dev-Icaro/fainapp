import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from 'pages/LoginForm';
import AuthBasePage from 'pages/AuthBasePage';

const AppRouter = () => {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthBasePage />}>
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default AppRouter;
