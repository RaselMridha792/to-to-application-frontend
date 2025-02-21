import { useSortable } from "@dnd-kit/sortable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, handleDelete, handleUpdateTask }) => {
  const { taskName, description, date, _id } = task;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: _id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <>
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="border touch-none cursor-grab rounded-lg bg-gray-600 py-2 px-2 flex w-full  justify-between"
      >
        <div className="flex-1">
          <h1 className=" font-bold text-2xl ">{taskName}</h1>
          <p className="text-sm">{date}</p>
          <p>{description}</p>
        </div>
        <div className="space-x-2">
          <button
            onPointerDown={(e) => e.stopPropagation()}  
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(_id);
            }}
            className="btn btn-sm btn-error z-10"
          >
            <FaTrash></FaTrash>
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateTask(_id);
            }}
            className="btn btn-sm btn-warning z-10"
          >
            <FaEdit></FaEdit>
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
