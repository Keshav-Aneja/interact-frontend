import React from 'react';
import { ReactSVG } from 'react-svg';
import ArrowRight from '@phosphor-icons/react/dist/icons/ArrowRight';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Toaster from '@/utils/toaster';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '@/config/routes';
import { useDispatch } from 'react-redux';
import { setUser } from '@/slices/userSlice';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { setConfig } from '@/slices/configSlice';
import { setOnboarding, setUnreadNotifications } from '@/slices/feedSlice';
import { User } from '@/types';
import socketService from '@/config/ws';
import axios from 'axios';
import nookies from 'nookies';
import { SERVER_ERROR } from '@/config/errors';
import configuredAxios from '@/config/axios';
import generateRandomProfilePicture from '@/utils/generate_profile_picture';

interface Props {
  token: string;
}

const SignUpCallback = ({ token }: Props) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [mutex, setMutex] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    if (username.trim().length < 4) {
      Toaster.error('Username too short');
      return;
    } else if (!/^([a-z][a-z0-9_]{4,})$/.test(username.trim().toLowerCase())) {
      Toaster.error('Enter a Valid Username');
      return;
    }

    if (mutex) return;
    setMutex(true);

    const randomProfilePic = await generateRandomProfilePicture(1080, 1080);
    const formData = new FormData();
    formData.append('username', username.trim().toLowerCase());
    if (randomProfilePic) formData.append('profilePic', randomProfilePic);

    const toaster = Toaster.startLoad('Creating your account...');

    await configuredAxios
      .post(`${BACKEND_URL}/auth/signup`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + token },
        withCredentials: true,
      })
      .then(res => {
        if (res.status === 201) {
          Toaster.stopLoad(toaster, 'Account Created!', 1);
          const user: User = res.data.user;
          user.email = res.data.email;
          user.phoneNo = res.data.phoneNo || '';
          user.resume = res.data.resume || '';
          Cookies.set('token', res.data.token, {
            expires: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRATION_TIME),
          });
          Cookies.set('id', user.id, {
            expires: Number(process.env.NEXT_PUBLIC_COOKIE_EXPIRATION_TIME),
          });
          dispatch(setUser(user));
          dispatch(setConfig());
          dispatch(setUnreadNotifications(1));
          dispatch(setOnboarding(true));
          socketService.connect(user.id);
          Cookies.set('verified', 'true');
          sessionStorage.setItem('onboarding-redirect', 'signup-callback');
          router.replace('/onboarding');
        }
        setMutex(false);
      })
      .catch(err => {
        if (err.response?.status == 403) {
          Toaster.stopLoad(toaster, 'Connection Timeout, Login again"', 0);
          router.replace('/signup');
        } else if (err.response?.data?.message) {
          Toaster.stopLoad(toaster, err.response.data.message, 0);
        } else {
          Toaster.stopLoad(toaster, SERVER_ERROR, 0);
        }
        setMutex(false);
      });
  };

  return (
    <>
      <Head>
        <title>SignUp | Interact</title>
      </Head>
      <div className="h-screen flex">
        <div className="w-[45%] max-lg:w-full h-full font-primary py-8 px-8 flex flex-col justify-between items-center">
          <div className="w-full flex justify-start">
            <ReactSVG src="/onboarding_logo.svg" />
          </div>
          <form onSubmit={handleSubmit} className="w-3/5 max-md:w-full flex flex-col items-center gap-6">
            <div className="flex flex-col gap-2 text-center">
              <div className="text-2xl font-semibold">One Last Step</div>
              <div className="text-gray-400">Enter your username</div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="font-medium">Username</div>
              <input
                maxLength={16}
                value={username}
                onChange={el => setUsername(el.target.value.toLowerCase())}
                type="text"
                className="w-full bg-white focus:outline-none border-2 p-2 rounded-xl text-gray-400"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-center">
              <button
                type="submit"
                className="w-full flex items-center cursor-pointer justify-center gap-2 bg-[#3D6DB3] hover:bg-[#345C98] active:bg-[#2D5185] border-[#d1d1d1] text-white py-2 rounded-xl border-2 font-semibold"
              >
                <div> Continue</div>
                <ArrowRight size={20} weight="regular" />
              </button>
            </div>
          </form>
          <div className="w-3/4 max-lg:w-full text-[12px] text-center text-gray-400">
            By clicking “Continue” above, you acknowledge that you have read and understood, and agree to
            Interact&apos;s <span className="underline underline-offset-2 font-medium">Term & Conditions</span> and{' '}
            <span className="underline underline-offset-2 font-medium">Privacy Policy.</span>
          </div>
        </div>
        <div className="w-[55%] max-lg:hidden h-full bg-onboarding bg-cover"></div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const access_token = nookies.get(context).token;
  if (access_token && process.env.NODE_ENV != 'development') {
    return {
      redirect: {
        permanent: true,
        destination: '/home',
      },
      props: { access_token },
    };
  }

  const { query } = context;
  const token = query.token;
  if (!token || token == '')
    return {
      redirect: {
        permanent: true,
        destination: '/signup',
      },
      props: { token },
    };
  return {
    props: { token },
  };
}
export default SignUpCallback;
