import {
  BrowserRouter, Route, Routes, Navigate,
  useLocation,
} from 'react-router-dom';
import { useState } from 'react';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from "./Components/Header";
import useAuth from './hooks/useAuth';
import AuthContext from "./contexts/AuthContext";
import SignUp from "./pages/SignUp";
import store from './slices/index.js';
import {Provider} from "react-redux";


const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const logIn = () => setLoggedIn(true);
    const logOut = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};



const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
      user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
    <Provider store={store}>
        <BrowserRouter >
            <AuthProvider >
                <Header />
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </Provider>

);

export default App;
