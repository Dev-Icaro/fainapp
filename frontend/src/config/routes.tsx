import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import VerifyPage from '@pages/VerifyPage';
import { SignupProvider } from '@features/authentication/context/signupContext';

const AppRouter = () => {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route element={<SignupProvider />}>
              <Route path="register" element={<SignupPage />} />
              <Route path="verify" element={<VerifyPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default AppRouter;
