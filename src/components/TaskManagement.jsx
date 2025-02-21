import { GrInProgress } from "react-icons/gr";
import { MdOutlineDownloadDone } from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";
import useGetTask from "../hooks/useGetTask";
import TaskCard from "./TaskCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoMdClose } from "react-icons/io";
import UpdateTask from "./UpdateTask";
import { useState } from "react";

const TaskManagement = () => {
  const [data, refetch, isLoading] = useGetTask();
  const axiosPublic = useAxiosPublic();
  const toDoData = data?.filter((datas) => datas.category == "to do");
  const pendingData = data?.filter((datas) => datas.category == "pending");
  const doneData = data?.filter((datas) => datas.category == "done");
  const [updateTaskId, setUpdateTaskId] = useState(null);

  const handleDelete = (id) => {
    axiosPublic
      .delete(`/tasks/${id}`)
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateTask = (id) => {
    document.getElementById("my_modal_5").showModal();
    setUpdateTaskId(id);
  };
  const handleCloseModal = () => {
    document.getElementById("my_modal_5").close();
    setUpdateTaskId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 text-black lg:grid-cols-3 gap-5">
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <UpdateTask
            handleCloseModal={handleCloseModal}
            data={data}
            refetch={refetch}
            updateTaskId={updateTaskId}
          ></UpdateTask>
          <div className="flex items-center justify-end">
            <button onClick={handleCloseModal} className="btn btn-error">
              <IoMdClose />
            </button>
          </div>
        </div>
      </dialog>
      <div className="border rounded-xl">
        <div className="bg-gray-400 py-5 rounded-xl">
          <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center">
            <PiTargetBold /> To Do
          </h1>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {!isLoading &&
            toDoData?.map((task) => (
              <TaskCard
                handleUpdateTask={handleUpdateTask}
                key={task._id}
                task={task}
                handleDelete={handleDelete}
              ></TaskCard>
            ))}
        </div>
      </div>
      <div className="border rounded-xl">
        <div className="bg-gray-400 py-5 rounded-xl">
          <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center">
            <GrInProgress /> doing
          </h1>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {!isLoading &&
            pendingData?.map((task) => (
              <TaskCard
                handleUpdateTask={handleUpdateTask}
                key={task._id}
                task={task}
                handleDelete={handleDelete}
              ></TaskCard>
            ))}
        </div>
      </div>
      <div className="border rounded-xl">
        <div className="bg-gray-400 py-5 rounded-xl">
          <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center">
            <MdOutlineDownloadDone /> done
          </h1>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {!isLoading &&
            doneData?.map((task) => (
              <TaskCard
                handleUpdateTask={handleUpdateTask}
                key={task._id}
                task={task}
                handleDelete={handleDelete}
              ></TaskCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
