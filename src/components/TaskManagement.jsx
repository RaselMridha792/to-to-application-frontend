
import useGetTask from "../hooks/useGetTask";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoMdClose } from "react-icons/io";
import UpdateTask from "./UpdateTask";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { BsFillTrash3Fill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";

const TaskManagement = () => {
  const [data, refetch, isLoading] = useGetTask();
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setNewData(data);
    }
  }, [data]);
  console.log(newData);
  const axiosPublic = useAxiosPublic();
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

  // const getDataPosition = (id) =>
  //   newData.findIndex((newDatas) => newDatas._id === id);
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const taskId = draggableId;

    const updatedTasks = [...newData];
    const draggedTask = updatedTasks.find((task) => task._id === taskId);

    if (!draggedTask) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same category
      const categoryTasks = updatedTasks
        .filter((task) => task.category === source.droppableId)
        .sort((a, b) => a.order - b.order);

      // Remove the dragged task
      const [movedTask] = categoryTasks.splice(source.index, 1);
      categoryTasks.splice(destination.index, 0, movedTask);

      // Assign new order values
      categoryTasks.forEach((task, index) => {
        task.order = index;
      });

      // Update the newData state with the new order
      const newnewData = updatedTasks.map((task) => {
        const updatedTask = categoryTasks.find((t) => t._id === task._id);
        return updatedTask ? updatedTask : task;
      });

      setNewData(newnewData);

      try {
        await axios.put("http://localhost:5000/tasks/reorder", {
          tasks: categoryTasks,
        });
        console.log("Reorder success!");
      } catch (error) {
        console.error("Failed to reorder tasks:", error);
      }
    } else {
      // Move to another category
      const movedTasks = updatedTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              category: destination.droppableId,
              order: destination.index,
            }
          : task
      );

      setNewData(movedTasks);

      try {
        await axios.put(`http://localhost:5000/tasks/${taskId}`, {
          category: destination.droppableId,
          order: destination.index,
        });
        console.log("Task category updated successfully!");
      } catch (error) {
        console.error("Failed to update task category:", error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        {["to do", "pending", "done"].map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-600 p-4 rounded-lg shadow-md"
              >
                <h1 className="text-3xl text-white text-center py-3 font-bold uppercase">{category}</h1>
                {newData
                  .filter((task) => task.category === category)
                  .sort((a, b) => a.order - b.order)
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="py-2 px-3 bg-gray-500 text-white rounded-md shadow mb-2 flex justify-between items-center"
                        >
                          <div>
                            <strong className="block text-2xl">
                              {task.taskName}
                            </strong>
                            <strong className="block">{task.date}</strong>
                            <p className="text-lg py-1">
                              {task.description}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={()=>handleUpdateTask(task._id)} className="text-lg btn btn-warning btn-sm">
                              <TiEdit />
                            </button>
                            <button onClick={()=>handleDelete(task._id)} className="btn btn-error btn-sm">
                              <BsFillTrash3Fill />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskManagement;
