import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginView, AuthBasePage, SignupView } from '@features/authentication';

const AppRouter = () => {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthBasePage />}>
            <Route path="login" element={<LoginView />} />
            <Route path="register" element={<SignupView />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default AppRouter;
