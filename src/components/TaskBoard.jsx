import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { BsFillTrash3Fill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useGetTask from "../hooks/useGetTask";
import { AuthContext } from "../context/AuthProvider";

const TaskBoard = () => {
  //   const [data, refetch] = useTask();
  const { user } = useContext(AuthContext);
  const [data, refetch, isLoading] = useGetTask();
  const [localdata, setLocaldata] = useState([]);

  useEffect(() => {
    if (data) {
      setLocaldata(data);
    } // Sync local data with fetched data
  }, [data]);

  const onDragEnd = async (result) => {
      if (!result.destination) return;
    
      const { source, destination, draggableId } = result;
      const taskId = draggableId;
    
      const updatedTasks = [...localdata];
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
    
        // Update the localdata state with the new order
        const newlocaldata = updatedTasks.map((task) => {
          const updatedTask = categoryTasks.find((t) => t._id === task._id);
          return updatedTask ? updatedTask : task;
        });
    
        setLocaldata(newlocaldata);
    
        try {
          await axios.put("http://localhost:5000/tasks/reorder", { tasks: categoryTasks });
          console.log("Reorder success!");
        } catch (error) {
          console.error("Failed to reorder tasks:", error);
        }
      } else {
        // Move to another category
        const movedTasks = updatedTasks.map((task) =>
          task._id === taskId
            ? { ...task, category: destination.droppableId, order: destination.index }
            : task
        );
    
        setLocaldata(movedTasks);
    
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
    <div className="md:p-4 container mx-auto">
      <div className="flex justify-center">
        <button className="md:text-xl px-5 py-3 text-black bg-gray-200 font-bold hover:bg-gray-300 rounded-full md:px-5 hover:border-white mb-4 sm:w-auto">
          Add New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["to do", "pending", "done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-200 p-4 rounded-md shadow-md"
                >
                  <h2 className="text-lg font-bold mb-2">{category}</h2>
                  {localdata
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
                            className="py-2 px-3 bg-white rounded-md shadow mb-2 flex justify-between items-center"
                          >
                            <div>
                              <strong className="block text-2xl">{task.taskName}</strong>
                              <strong className="block">{task.date}</strong>
                              <p className="text-sm text-gray-600">
                                {task.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="text-xl hover:text-black"
                              >
                                <TiEdit />
                              </button>
                              <button
                                onClick={() =>
                                  deleteTaskMutation.mutate(task._id)
                                }
                                className="text-lg hover:text-red-700"
                              >
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
    </div>
  );
};

export default TaskBoard;
