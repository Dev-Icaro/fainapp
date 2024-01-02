import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from 'presentation/views/auth/LoginForm';
import AuthBasePage from 'presentation/views/auth/AuthBasePage';
import RegisterForm from 'presentation/views/auth/RegisterForm';

const AppRouter = () => {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthBasePage />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default AppRouter;
