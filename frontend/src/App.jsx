import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {Provider, ErrorBoundary} from '@rollbar/react'; // Provider imports 'rollbar'
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import {appPaths} from './routes';

const rollbarConfig = {
    accessToken: process.env.REACT_APP_TOKEN_ACCESS,
    environment: 'production',
};
const App = () => (
    <Provider config={rollbarConfig}>
        <ErrorBoundary>
            <BrowserRouter>
                <div className="vh-100" style={{background: '#dad5b5'}}>
                    <Header/>
                    <Routes>
                        <Route path={appPaths.notFound()} element={<NotFound/>}/>
                        <Route path={appPaths.home()} element={<PrivateRoute><Home/></PrivateRoute>}/>
                        <Route path={appPaths.login()} element={<Login/>}/>
                        <Route path={appPaths.signup()} element={<Signup/>}/>
                    </Routes>
                    <ToastContainer/>
                </div>
            </BrowserRouter>
        </ErrorBoundary>
    </Provider>
);

export default App;