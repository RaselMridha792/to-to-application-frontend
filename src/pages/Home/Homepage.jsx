import { FaEdit } from "react-icons/fa";
import AddTask from "../../components/AddTask";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Homepage = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-5">
        <div className="my-5 flex items-center justify-center">
          <button onClick={() => document.getElementById("my_modal_4").showModal()} className="btn btn-neutral">
            <FaEdit></FaEdit> Add New Task
          </button>
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
          <AddTask user={user}></AddTask>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Add Task</button>
              </form>
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
