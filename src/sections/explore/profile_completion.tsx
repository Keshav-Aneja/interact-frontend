import { profileCompletionOpenSelector, setProfileCompletionOpen } from '@/slices/feedSlice';
import { userSelector } from '@/slices/userSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfileCompletion = () => {
  const [hide, setHide] = useState(true);

  const user = useSelector(userSelector);
  const open = useSelector(profileCompletionOpenSelector);

  const dispatch = useDispatch();

  const getPercentage = (): number => {
    const totalPoints = 5;
    var counter = 0;
    if (user.bio != '') counter++;
    if ((user.links || []).length != 0) counter++;
    if (user.tagline != '') counter++;
    if (user.email != '') counter++;
    if ((user.ownerProjects || []).length != 0) counter++;
    return Math.floor((counter / totalPoints) * 100);
  };

  const completionPercentage = getPercentage();

  useEffect(() => {
    if (completionPercentage != 100) setHide(false);
    const circleBackground = document.getElementById('circleBackground');
    const circleLength = 2 * Math.PI * parseFloat(circleBackground?.getAttribute('r') as string);
    const dashOffset = circleLength * ((100 - completionPercentage) / 100);
    circleBackground?.setAttribute('stroke-dashoffset', String(dashOffset));
  }, []);
  return (
    <div
      onClick={() => dispatch(setProfileCompletionOpen(!open))}
      className={`${
        hide ? 'hidden' : ''
      } w-full py-4 p-8 flex items-center justify-between hover:shadow-xl border-[1px] bg-white dark:bg-transparent dark:text-white border-gray-400 dark:border-dark_primary_btn rounded-md cursor-pointer transition-ease-500`}
    >
      <div className="flex flex-col gap-1">
        <div className="text-gradient text-5xl font-bold">Complete Profile</div>
        <div className="text-xl font-medium">to increase your reach!</div>
      </div>
      <div className="relative">
        <div className="text-2xl font-bold absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-gradient">
          {completionPercentage}%
        </div>
        <svg id="dynamicCircle" className="-rotate-90" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <circle
            id="circleBackground"
            cx="50"
            cy="50"
            r="40"
            className="stroke-dark_primary_btn"
            fill="transparent"
            stroke-width="5"
            stroke-dasharray="251.3274"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProfileCompletion;
