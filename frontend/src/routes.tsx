import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from '@/features/authentication/components/LoginForm';
import AuthBasePage from '@/features/authentication/components/AuthBasePage';
import RegisterForm from '@/features/authentication/components/RegisterForm';

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
