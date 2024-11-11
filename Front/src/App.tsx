import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import LandingPage from './pages/home/LandingPage';
import HomePage from './pages/home/HomePage';
import LoginCallbackPage from './pages/user/LoginCallbackPage';
import { Provider } from 'react-redux';
import { store, RootState, persistor } from './stores/store';
import SignUpPage from './pages/user/SignUpPage';
import FAQPage from './pages/inquiry/FAQPage';
import RequestListPage from './pages/inquiry/RequestListPage';
import RequestCreatePage from './pages/inquiry/RequestCreatePage';
import RequestDetailPage from './pages/inquiry/RequestDetailPage';
import RequestEditPage from './pages/inquiry/RequestEditPage';
import SideBar from './components/common/SideBar';
import ModelCreatePage from './pages/voiceModel/ModelCreatePage';
import ModelDetailPage from './pages/voiceModel/ModelDetailPage';
import RecordingPage from './pages/voiceModel/RecordingPage';
import CoverDetailPage from './pages/aiCover/CoverDetailPage';
import CoverListPage from './pages/aiCover/CoverListPage';
import CoverResultPage from './pages/aiCover/CoverResultPage';
import PrivateRoute from './components/common/PrivateRoute';
import CoverCreatePage from './pages/aiCover/CoverCreatePage';
import ProfilePage from './pages/user/ProfilePage';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DubbingListPage from './pages/dubbing/DubbingListPage';
import DubbingDetailPage from './pages/dubbing/DubbingDetailPage';
import GlobalModal from './components/common/GlobalModal';
import UserDubbingDetailPage from './pages/dubbing/UserDubbingDetailPage';
import Header from './components/common/Header';
import { PersistGate } from 'redux-persist/integration/react';
import UserDubbingCreatePage from './pages/dubbing/UserDubbingCreatePage';
import DubbingEditPage from './pages/dubbing/DubbingEditPage';
import ModelEditPage from './pages/voiceModel/ModelEditPage';

const Content = styled.div<{ $isOpen: boolean }>`
  padding-left: ${(props) => (props.$isOpen ? '314px' : '60px')};
  width: 100%;
`;

function Layout() {
  const location = useLocation();
  const isOpen = useSelector((state: RootState) => state.common.isOpen);

  // 헤더가 포함되지 않는 경로들
  const noHeaderRoutes = ['/landing', '/login-callback/:provider', '/signup'];

  const showHeader = !noHeaderRoutes.some((route) =>
    location.pathname.match(route),
  );

  return (
    <div className="flex">
      <GlobalModal />
      <SideBar />
      <Content $isOpen={isOpen}>
        {showHeader && <Header />}
        <Outlet />
      </Content>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/landing',
    element: <LandingPage />,
  },
  {
    path: '/login-callback/:provider',
    element: <LoginCallbackPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'request',
            children: [
              {
                index: true,
                element: <RequestListPage />,
              },
              {
                path: 'create',
                element: <RequestCreatePage />,
              },
              {
                path: ':id',
                element: <RequestDetailPage />,
              },
              {
                path: ':id/edit',
                element: <RequestEditPage />,
              },
            ],
          },
          {
            path: 'FAQ',
            element: <FAQPage />,
          },
          {
            path: 'model',
            children: [
              {
                path: 'create',
                element: <ModelCreatePage />,
              },
              {
                path: ':code',
                children: [
                  {
                    index: true,
                    element: <ModelDetailPage />,
                  },
                  {
                    path: 'edit',
                    element: <ModelEditPage />,
                  },
                  {
                    path: 'record',
                    element: <RecordingPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'cover',
            children: [
              {
                index: true,
                element: <CoverListPage />,
              },
              {
                path: 'create',
                element: <CoverCreatePage />,
              },
              {
                path: ':id',
                element: <CoverDetailPage />,
              },
              {
                path: 'register/:id',
                element: <CoverResultPage />,
              },
              {
                path: 'board/:id',
                element: <CoverResultPage />,
              },
            ],
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'dubbing',
            children: [
              {
                index: true,
                element: <DubbingListPage />,
              },
              {
                path: ':sourceCode',
                children: [
                  {
                    index: true,
                    element: <DubbingDetailPage />,
                  },
                  {
                    path: ':dubCode',
                    children: [
                      {
                        index: true,
                        element: <UserDubbingDetailPage />,
                      },
                      {
                        path: 'edit',
                        element: <DubbingEditPage />,
                      },
                    ],
                  },
                  {
                    path: 'create',
                    element: <UserDubbingCreatePage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
