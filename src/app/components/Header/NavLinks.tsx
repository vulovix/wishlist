import { NavLink } from 'react-router-dom';

import { useAuthControllerScope } from '@controllers/auth';
// import { IAuthenticatedUser } from '@implementation/auth/types';
import { useSelector } from '@service';
import { useTranslation } from '@translations';

export default function NavLinks(): JSX.Element {
  const t = useTranslation();
  const {
    implementation: {
      auth: { selectors },
    },
  } = useAuthControllerScope();
  // const user: IAuthenticatedUser = useSelector(selectors.selectAuthUser);
  const isUserLoggedIn = useSelector(selectors.selectIsLoggedIn);
  return (
    <>
      {isUserLoggedIn ? (
        <>
          {/* <NavLink to="/wishlist" className="nav-item">
            {t('wishlistTitle')}
          </NavLink> */}
        </>
      ) : (
        <>
          {/* <NavLink to="/applications" className="nav-item">
            {t('applications')}
          </NavLink> */}
        </>
      )}
      {isUserLoggedIn && (
        <NavLink to="/sign-out" className="nav-item">
          {t('signOut')}
        </NavLink>
      )}
      {!isUserLoggedIn && (
        <NavLink to="/sign-in" className="nav-item">
          {t('signIn')}
        </NavLink>
      )}
    </>
  );
}
