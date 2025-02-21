import { GrInProgress } from "react-icons/gr";
import { MdOutlineDownloadDone } from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";
import useGetTask from "../hooks/useGetTask";
import TaskCard from "./TaskCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoMdClose } from "react-icons/io";
import UpdateTask from "./UpdateTask";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { closestCorners, DndContext } from "@dnd-kit/core";

const TaskManagement = () => {
  const [data, refetch, isLoading] = useGetTask();
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (data) {
      setNewData(data);
    }
  },[data]);
  const axiosPublic = useAxiosPublic();
  const toDoData = newData?.filter((datas) => datas.category == "to do");
  const pendingData = newData?.filter((datas) => datas.category == "pending");
  const doneData = newData?.filter((datas) => datas.category == "done");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const handleDelete = (id) => {
    console.log("called delete", id);
    axiosPublic
      .delete(`/tasks/${id}`)
      .then((res) => {
        console.log(res);
        refetch();
        Swal.fire({
          title: "Deleted successful",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "problem to delete",
          icon: "error",
          draggable: true,
        });
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


  const getDataPosition = id => newData.findIndex(newDatas => newDatas._id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setNewData( newData =>{
      const originalPosition = getDataPosition(active.id)
      const newPosition = getDataPosition(over.id)

      return arrayMove(newData, originalPosition, newPosition);
    })
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 text-white lg:grid-cols-3 gap-5">
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
          <div className="bg-gray-700 py-5 rounded-xl">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center">
              <PiTargetBold /> To Do
            </h1>
          </div>

          {/* tasks column  */}
          <div className="flex flex-col gap-3 mt-5">
            <SortableContext
              items={
                Array.isArray(toDoData) ? toDoData.map((task) => task._id) : []
              }
              strategy={verticalListSortingStrategy}
            >
              {!isLoading &&
                toDoData?.map((task) => (
                  <TaskCard
                    handleUpdateTask={handleUpdateTask}
                    key={task._id}
                    task={task}
                    handleDelete={handleDelete}
                  ></TaskCard>
                ))}
            </SortableContext>
          </div>
        </div>
        <div className="border rounded-xl">
          <div className="bg-gray-700 py-5 rounded-xl">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center">
              <GrInProgress /> doing
            </h1>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <SortableContext
              items={
                Array.isArray(pendingData)
                  ? pendingData.map((task) => task._id)
                  : []
              }
              strategy={verticalListSortingStrategy}
            >
              {!isLoading &&
                pendingData?.map((task) => (
                  <TaskCard
                    handleUpdateTask={handleUpdateTask}
                    key={task._id}
                    task={task}
                    handleDelete={handleDelete}
                  ></TaskCard>
                ))}
            </SortableContext>
          </div>
        </div>
        <div className="border rounded-xl">
          <div className="bg-gray-700 py-5 rounded-xl">
            <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center">
              <MdOutlineDownloadDone /> done
            </h1>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <SortableContext
              items={
                Array.isArray(doneData) ? doneData.map((task) => task._id) : []
              }
              strategy={verticalListSortingStrategy}
            >
              {!isLoading &&
                doneData?.map((task) => (
                  <TaskCard
                    handleUpdateTask={handleUpdateTask}
                    key={task._id}
                    task={task}
                    handleDelete={handleDelete}
                  ></TaskCard>
                ))}
            </SortableContext>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default TaskManagement;
