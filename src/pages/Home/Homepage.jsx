import { FaEdit } from "react-icons/fa";
import AddTask from "../../components/AddTask";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IoMdClose } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import TaskManagement from "../../components/TaskManagement";
import useGetTask from "../../hooks/useGetTask";
import {DndContext } from "@dnd-kit/core";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [data, refetch, isLoading] = useGetTask();

  const handleCloseModal = () => {
    document.getElementById("my_modal_4").close();
  };

  const handleSaveTask = (task) => {
    axiosPublic
      .post("/tasks", task)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Successfully added task",
          icon: "success",
          draggable: true,
        });
        refetch();
        handleCloseModal();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
        });
        console.log(error);
      });
  };
  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-5">
        <div className="my-5 flex items-center justify-center">
          <button
            onClick={() => document.getElementById("my_modal_4").showModal()}
            className="btn btn-neutral"
          >
            <FaEdit></FaEdit> Add New Task
          </button>
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <AddTask handleSaveTask={handleSaveTask} user={user}></AddTask>
            <div className="flex items-center justify-end">
              <button onClick={handleCloseModal} className="btn btn-error">
                <IoMdClose />
              </button>
            </div>
          </div>
        </dialog>
        <div className="divider"></div>
        <div>
          <DndContext>
            <TaskManagement></TaskManagement>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default Homepage;
