import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import BasicLayout from '@components/Layout/BasicLayout';
import DefaultLayout from '@components/Layout/DefaultLayout';
import { useAuthControllerScope } from '@controllers/auth';
import { AppStatusEnum } from '@implementation/auth/types';
import { LoginPage } from '@pages/Auth/LoginPage';
import LogoutPage from '@pages/Auth/LogoutPage';
import { RegisterPage } from '@pages/Auth/RegisterPage';
import WishlistPage from '@pages/Wishlist';
import WishlistOverview from '@pages/Wishlist/views/Overview';
import WishlistShare from '@pages/Wishlist/views/Share';
import { Loading } from '@reactoso-ui';
import { useSelector } from '@service';
import './style/style.scss';

const App = (): JSX.Element => {
  const authController = useAuthControllerScope();
  const appStatus = useSelector(authController.implementation.auth.selectors.selectAppStatus);
  const isLoggedIn = useSelector(authController.implementation.auth.selectors.selectIsLoggedIn);
  if (appStatus === AppStatusEnum.NotReady) {
    return (
      <div className="loading-overlay">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/sign-in"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <BasicLayout>
                  <LoginPage />
                </BasicLayout>
              )
            }
          />
          <Route path="/sign-out" element={!isLoggedIn ? <Navigate to="/" /> : <LogoutPage />} />

          <Route
            path="/sign-up"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <BasicLayout>
                  <RegisterPage />
                </BasicLayout>
              )
            }
          />

          <Route
            path="/"
            element={
              <DefaultLayout>
                <WishlistPage />
              </DefaultLayout>
            }
          >
            <Route path="" element={isLoggedIn ? <WishlistOverview /> : <Navigate to="/sign-in" />} />
            <Route path="share" element={<WishlistShare />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default App;
