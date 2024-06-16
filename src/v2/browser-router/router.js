import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import SignIn from '../login/signIn';
import LandingPage from '../landing-page/landingPage';
import PageNotFound from '../../components/error/RouteErrors';
import Privacy from '../../components/legal/Privacy';
import TermsOfService from '../../components/legal/Terms';
import About from '../../components/about/About';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        errorElement: <PageNotFound />
    },
    {
        path: '/login',
        element: <SignIn />
    },
    {
        path: '/home',
        element: <App />
    },
    {
        path: '/privacy',
        element: <Privacy />
    },
    {
        path: '/terms',
        element: <TermsOfService />
    },
    {
        path: '/about',
        element: <About />
    }
]);

export default Router;