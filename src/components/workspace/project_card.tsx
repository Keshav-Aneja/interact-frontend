import React, { useState } from 'react';
import { Project } from '@/types';
import Image from 'next/image';
import { PROJECT_PIC_URL } from '@/config/routes';
import { CircleDashed, HeartStraight } from '@phosphor-icons/react';

interface Props {
  index: number;
  project: Project;
  setClickedOnProject: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedProjectIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ProjectCard = ({ index, project, setClickedOnProject, setClickedProjectIndex }: Props) => {
  const [clickedOnSettings, setClickedOnSettings] = useState(false);
  return (
    <div
      onClick={() => {
        setClickedOnProject(true);
        setClickedProjectIndex(index);
      }}
      className="w-72 h-72 rounded-lg relative group cursor-pointer"
    >
      <div className="w-full h-full absolute top-0 hidden group-hover:flex gap-4 animate-fade_third z-20 rounded-lg p-2">
        <div
          onClick={el => {
            el.stopPropagation();
            setClickedOnSettings(prev => !prev);
          }}
          className="h-8 w-8 flex-center glassMorphism rounded-full text-white p-1"
        >
          •••
        </div>
        {clickedOnSettings ? (
          <div className="w-1/2 h-fit rounded-2xl glassMorphism text-white p-2">
            <div className="w-full px-4 py-3 hover:bg-[#ffffff19] transition-ease-100 rounded-lg">Edit</div>
            <div className="w-full px-4 py-3 hover:bg-[#ffffff19] transition-ease-100 rounded-lg">Delete</div>
            <div className="w-full px-4 py-3 hover:bg-[#ffffff19] transition-ease-100 rounded-lg">Promote</div>
            <div className="w-full px-4 py-3 hover:bg-[#ffffff19] transition-ease-100 rounded-lg">UnPublish</div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-full rounded-lg absolute top-0 left-0 bg-gradient-to-b from-[#00000084] z-10 to-transparent opacity-0 group-hover:opacity-100 transition-ease-300"></div>
      <Image
        crossOrigin="anonymous"
        className="w-full h-full rounded-lg object-cover absolute top-0 left-0 "
        src={`${PROJECT_PIC_URL}/${project.coverPic}`}
        alt="Project Cover"
        width={10000}
        height={10000}
      />
      <div className="w-full glassMorphism text-white rounded-b-lg font-primary absolute bottom-0 right-0 flex flex-col px-4 py-2">
        <div className="text-xl">{project.title}</div>
        <div className="w-full flex items-center justify-between">
          <div className="text-sm">Pratham Mishra</div>
          {
            //TODO add actual name
          }
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <HeartStraight size={16} />
              <div>{project.noLikes}</div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <CircleDashed size={16} />
              <div>{project.noShares}</div>{' '}
              {
                //TODO change to number of views
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;