import React, { ComponentType, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Toaster from '../toaster';
import Base from '@/screens/base_template';
import { useSelector } from 'react-redux';
import { userSelector } from '@/slices/userSlice';

const OrgProtect = <Props extends Object>(Component: ComponentType<Props>) => {
  const ProtectedComponent = (props: Props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(0);
    const user = useSelector(userSelector);

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token || token == '' || user.id == '') {
        Toaster.error('You are not logged in.');
        setIsAuthenticated(0);
        router.replace('/login');
      } else if (!user.isOrganization) {
        Toaster.error('Page only for organization accounts.');
        setIsAuthenticated(0);
        router.replace('/home');
      } else setIsAuthenticated(1);
    }, []);

    if (isAuthenticated === 1) return <Component {...props} />;
    return <Base />;
  };
  return ProtectedComponent;
};

export default OrgProtect;