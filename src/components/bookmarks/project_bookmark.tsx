import { PROJECT_PIC_URL } from '@/config/routes';
import { ProjectBookmark } from '@/types';
import { Check } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  bookmark: ProjectBookmark;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  setBookmark: React.Dispatch<React.SetStateAction<ProjectBookmark>>;
  handleEdit: (bookmarkID: string, title: string) => Promise<number>;
  handleDelete: (bookmarkID: string) => Promise<void>;
}

const ProjectBookmark = ({ bookmark, setClick, setBookmark, handleEdit, handleDelete }: Props) => {
  let count = 0;
  const [clickedOnSettings, setClickedOnSettings] = useState(false);
  const [clickedOnEdit, setClickedOnEdit] = useState(false);

  const [title, setTitle] = useState(bookmark.title);

  const handleSubmit = async (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    const status = await handleEdit(bookmark.id, title);
    if (status == 1) setClickedOnEdit(false);
  };
  return (
    <div className="w-96 h-108 bg-white border-2">
      <div
        onClick={() => {
          setBookmark(bookmark);
          setClick(true);
        }}
        className="group relative cursor-pointer"
      >
        <div className="w-full h-full absolute p-2 top-2 left-2 hidden group-hover:flex gap-4 animate-fade_third z-20 rounded-lg cursor-pointer">
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
              <div
                onClick={el => {
                  el.stopPropagation();
                  setClickedOnEdit(prev => !prev);
                  setClickedOnSettings(false);
                }}
                className="w-full px-4 py-3 hover:bg-[#ffffff19] transition-ease-100 rounded-lg"
              >
                {clickedOnEdit ? 'Cancel' : 'Edit'}
              </div>
              <div className="w-full px-4 py-3 hover:bg-[#ffffff19] transition-ease-100 rounded-lg">Delete</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {bookmark.projectItems ? (
          <>
            {bookmark.projectItems.length == 0 ? (
              <div className="p-2">
                <div className="w-full h-[368px] bg-[#c578bf63] rounded-md"></div>
              </div>
            ) : bookmark.projectItems.length == 1 ? (
              <>
                {bookmark.projectItems[0].project.coverPic ? (
                  <div className="p-2">
                    <Image
                      crossOrigin="anonymous"
                      className="w-full h-[368px] rounded-md object-cover"
                      width={10000}
                      height={10000}
                      alt=""
                      src={`${PROJECT_PIC_URL}/${bookmark.projectItems[0].project.coverPic}`}
                    />
                  </div>
                ) : (
                  <div className="w-full h-96 bg-[#c578bf63] rounded-md"></div>
                )}
              </>
            ) : (
              <div className="w-full h-96 flex flex-wrap gap-2 p-2 items-center justify-center">
                {bookmark.projectItems.map(projectItem => {
                  if (count >= 4 || !projectItem.project.coverPic) {
                    return <></>;
                  }
                  count++;
                  return (
                    <Image
                      key={projectItem.projectID}
                      crossOrigin="anonymous"
                      className="w-[48%] h-[49%] object-cover rounded-md"
                      width={10000}
                      height={10000}
                      alt=""
                      src={`${PROJECT_PIC_URL}/${projectItem.project.coverPic}`}
                    />
                  );
                })}
                {[...Array(4 - count)].map((_, index) => (
                  <div key={index} className="w-[48%] h-[49%] bg-[#c578bf63] rounded-md"></div>
                ))}
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full flex flex-col p-4">
        {clickedOnEdit ? (
          <form onSubmit={handleSubmit} className="w-full flex gap-2 items-center mb-2">
            <input
              value={title}
              onChange={el => setTitle(el.target.value)}
              className="w-full bg-transparent text-xl font-semibold border-[1px] p-2 rounded-md border-primary_btn focus:outline-none"
            />
            <button type="submit">
              <Check className="cursor-pointer" color="white" size={32} />
            </button>
          </form>
        ) : (
          <div className="w-full text-3xl font-semibold">{bookmark.title}</div>
        )}
        <div>
          {bookmark.projectItems.length || 0} Post{bookmark.projectItems.length != 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default ProjectBookmark;
