import { Profile } from '@/types';
import { Buildings, CalendarBlank, Certificate } from '@phosphor-icons/react';
import React from 'react';

interface Props {
  profile: Profile;
}

const About = ({ profile }: Props) => {
  return (
    <div className="w-[640px] text-primary_black mx-auto flex flex-col gap-4 pb-8">
      <div className="w-full flex flex-col gap-2">
        {profile.school != '' ? (
          <div className="w-full flex justify-between items-center flex-wrap gap-4">
            <div className="flex gap-2 items-center text-xl font-medium">
              <Buildings weight="bold" size={24} />
              <div>{profile.school}</div>
            </div>
            {profile.yearOfGraduation != 0 ? (
              <div className="flex gap-1 items-center">
                <div>{profile.yearOfGraduation}</div>
                <CalendarBlank weight="bold" size={20} />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {profile.degree != '' ? (
          <div className="flex gap-2 items-center text-lg">
            <Certificate weight="bold" size={24} />
            <div>Computer Science and Engineering</div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {profile.school != '' || profile.degree != '' ? (
        <div className="w-full h-[1px] border-t-[1px] border-gray-400 border-dashed"></div>
      ) : (
        <></>
      )}
      {profile.description != '' ? (
        <>
          <div className="whitespace-pre-wrap">{profile.description}</div>
          <div className="w-full h-[1px] border-t-[1px] border-gray-400 border-dashed"></div>
        </>
      ) : (
        <></>
      )}
      {profile.areasOfCollaboration && profile.areasOfCollaboration.length > 0 ? (
        <>
          <div className="w-full flex flex-col gap-2">
            <div className="text-sm font-medium uppercase">Preferred Areas of Collaboration</div>
            <div className="w-full flex flex-wrap gap-4">
              {['Computer Science', 'Artificial Intelligence', 'Machine Learning', 'Finance'].map((el, i) => (
                <div key={i} className="border-gray-500 border-[1px] border-dashed p-2 text-sm rounded-lg flex-center">
                  {el}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[1px] border-t-[1px] border-gray-400 border-dashed"></div>
        </>
      ) : (
        <></>
      )}
      {profile.hobbies && profile.hobbies.length > 0 ? (
        <div className="w-full flex flex-col gap-2">
          <div className="text-sm font-medium uppercase">Hobbies and Interest</div>
          <div className="w-full flex flex-wrap">
            {profile.hobbies.map((el, i) => (
              <div
                key={i}
                className="text-sm hover:bg-white p-3 py-2 rounded-lg cursor-default hover:scale-105 transition-ease-500"
              >
                {el}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {!profile.areasOfCollaboration || profile.areasOfCollaboration.length == 0 ? (
        !profile.hobbies || profile.hobbies.length == 0 ? (
          profile.degree == '' && profile.description == '' && profile.school == '' ? (
            <div className="w-fit mx-auto font-medium text-xl">No Content Here</div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {/* <div className="w-full h-[1px] border-t-[1px] border-gray-400 border-dashed"></div>
      <div className="w-full flex flex-col gap-2">
        <div className="text-sm font-medium uppercase">Achievements</div>
      </div> */}
    </div>
  );
};

export default About;