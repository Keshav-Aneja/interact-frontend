import { userIDSelector } from '@/slices/userSlice';
import { SubTask, Task } from '@/types';
import { ArrowArcLeft, Gear, Trash } from '@phosphor-icons/react';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { TASK_URL, USER_PROFILE_PIC_URL } from '@/config/routes';
import Toaster from '@/utils/toaster';
import patchHandler from '@/handlers/patch_handler';
import { SERVER_ERROR } from '@/config/errors';
import deleteHandler from '@/handlers/delete_handler';
import ConfirmDelete from '@/components/common/confirm_delete';

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  subTask: SubTask;
  task: Task;
  setClickedOnEditSubTask: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedOnDeleteSubTask: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
  setFilteredTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SubTaskView = ({
  setShow,
  subTask,
  task,
  setClickedOnEditSubTask,
  setClickedOnDeleteSubTask,
  setTasks,
  setFilteredTasks,
}: Props) => {
  const userID = useSelector(userIDSelector);

  const isAssignedUser = (userID: string) => {
    var check = false;
    task.users.forEach(user => {
      if (user.id == userID) {
        check = true;
        return;
      }
    });
    return check;
  };

  const toggleComplete = async () => {
    const toaster = Toaster.startLoad(subTask.isCompleted ? 'Marking Incomplete' : 'Marking Completed');

    const URL = `${TASK_URL}/sub/completed/${subTask.id}`;

    const res = await patchHandler(URL, { isCompleted: !subTask.isCompleted });

    if (res.statusCode === 200) {
      if (setTasks)
        setTasks(prev =>
          prev.map(t => {
            if (t.id == task.id)
              return {
                ...t,
                subTasks: t.subTasks.map(s => {
                  if (s.id == subTask.id) {
                    return { ...s, isCompleted: !s.isCompleted };
                  } else return s;
                }),
              };
            else return t;
          })
        );
      if (setFilteredTasks)
        setFilteredTasks(prev =>
          prev.map(t => {
            if (t.id == task.id)
              return {
                ...t,
                subTasks: t.subTasks.map(s => {
                  if (s.id == subTask.id) {
                    return { ...s, isCompleted: !s.isCompleted };
                  } else return s;
                }),
              };
            else return t;
          })
        );
      setShow(false);
      Toaster.stopLoad(toaster, subTask.isCompleted ? 'Task Marked Incomplete' : 'Task Completed', 1);
    } else {
      Toaster.stopLoad(toaster, SERVER_ERROR, 0);
    }
  };

  return (
    <>
      <div className="fixed top-24 max-md:top-20 w-[640px] max-md:w-5/6 backdrop-blur-2xl bg-white dark:bg-[#ffe1fc22] flex flex-col gap-4 rounded-lg p-10 max-md:p-5 dark:text-white font-primary border-[1px] border-primary_btn  dark:border-dark_primary_btn right-1/2 translate-x-1/2 animate-fade_third z-50">
        <div className="w-full flex flex-col gap-2 max-md:gap-8">
          <ArrowArcLeft
            className="cursor-pointer"
            size={24}
            onClick={() => {
              setShow(false);
            }}
          />
          <div className="w-full flex justify-between items-center">
            <div className="text-4xl font-semibold">{subTask.title}</div>
            {isAssignedUser(userID) ? (
              <div className="flex gap-2">
                <Gear
                  onClick={() => {
                    setShow(false);
                    setClickedOnEditSubTask(true);
                  }}
                  className="cursor-pointer"
                  size={32}
                />
                <Trash
                  onClick={() => {
                    setShow(false);
                    setClickedOnDeleteSubTask(true);
                  }}
                  className="cursor-pointer"
                  size={32}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="text-lg">{subTask.description}</div>
          <div className="w-full flex flex-wrap gap-2">
            {subTask.tags.map(tag => {
              return (
                <div key={tag} className="text-xs border-black border-[1px] px-2 py-1 rounded-lg">
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>Deadline:</div>
          <div className="font-semibold">{moment(subTask.deadline).format('DD-MMM-YY')}</div>
          <div className="text-xs">({moment(subTask.deadline).fromNow()})</div>
        </div>
        {subTask.users.length > 0 ? (
          <div className="w-full flex flex-col gap-2">
            <div className="text-xl font-medium">Assigned To</div>
            <div className="w-full flex flex-wrap justify-between gap-2">
              {subTask.users.map(user => {
                return (
                  <div key={user.id} className="w-1/2 flex gap-4 border-[1px] border-gray-900 rounded-lg p-2">
                    <Image
                      crossOrigin="anonymous"
                      width={10000}
                      height={10000}
                      alt={'User Pic'}
                      src={`${USER_PROFILE_PIC_URL}/${user.profilePic}`}
                      className={'rounded-full w-16 h-16'}
                    />
                    <div className="grow">
                      <div className="text-xl font-medium">{user.name}</div>
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600">@{user.username}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {isAssignedUser(userID) ? (
              <div
                onClick={() => {
                  setShow(false);
                  setClickedOnEditSubTask(true);
                }}
                className="w-full text-base bg-gray-100 rounded-xl p-4 hover:scale-105 cursor-pointer transition-ease-300"
              >
                <span className="text-xl max-md:text-lg text-gradient font-semibold">Your sub task is lonely! </span>{' '}
                and looking for a buddy. Don&apos;t leave it hanging, assign it to a team member and let the magic
                begin! 🚀
              </div>
            ) : (
              <></>
            )}
          </>
        )}

        {isAssignedUser(userID) ? (
          subTask.isCompleted ? (
            <div className="w-full flex justify-center gap-2 border-t-[1px] pt-4 border-[#34343479]">
              <div className="w-fit text-xl font-semibold text-gradient">Not Completed?</div>
              <span
                onClick={toggleComplete}
                className="text-lg cursor-pointer hover-underline-animation after:bg-dark_primary_btn"
              >
                Mark incomplete
              </span>
            </div>
          ) : (
            <div className="w-full text-center flex flex-col gap-2 border-t-[1px] pt-4 border-[#34343479]">
              <div
                onClick={toggleComplete}
                className="w-fit mx-auto text-xl text-gradient font-semibold hover-underline-animation after:bg-dark_primary_btn cursor-pointer"
              >
                Mark Completed
              </div>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
      <div
        onClick={() => setShow(false)}
        className="bg-backdrop w-screen h-screen fixed top-0 left-0 animate-fade_third z-20"
      ></div>
    </>
  );
};

export default SubTaskView;
