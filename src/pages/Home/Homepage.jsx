import { FaEdit } from "react-icons/fa";
import AddTask from "../../components/AddTask";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { IoMdClose } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleCloseModal = () => {
    document.getElementById("my_modal_4").close();
  };

  const handleSaveTask = (task) =>{
    axiosPublic.post('/user/to-do', task)
    .then(res =>{
      console.log(res)
      handleCloseModal()
    }).catch(error =>{
      console.log(error)
    })
  }
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
              <button onClick={handleCloseModal} className="btn btn-error"><IoMdClose /></button>
            </div>
          </div>
        </dialog>
        <div className="divider"></div>
        <div></div>
      </div>
    </>
  );
};

export default Homepage;
