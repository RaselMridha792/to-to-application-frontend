import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, handleDelete }) => {
  const { taskName, description, date, _id } = task;
  return (
    <>
      <div draggable className="border rounded-lg bg-gray-300 py-2 px-2 flex items-start justify-between">
        <div>
          <h1 className=" font-bold text-2xl ">{taskName}</h1>
          <p className="text-sm">{date}</p>
          <p>{description}</p>
        </div>
        <div className="space-x-2">
            <button onClick={()=>handleDelete(_id)} className="btn btn-sm btn-error"><FaTrash></FaTrash></button>
            <button  className="btn btn-sm btn-warning"><FaEdit></FaEdit></button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
