import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateTask = ({ updateTaskId, data, refetch, handleCloseModal }) => {
  const [taskName, setTaskName] = useState("");
  const [descriptionName, setDescriptionName] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [category, setCategory] = useState("to do");

  console.log(updateTaskId);
  const updateAble = data?.find((datas) => datas._id == updateTaskId);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (updateAble) {
      setTaskName(updateAble.taskName);
      setDescriptionName(updateAble.description);
      setCategory(updateAble.category);
    }
  }, [updateAble]);

  const handleTaskNameLimit = (e) => {
    const value = e.target.value;

    if (value.length > 50) {
      setError1("Task name cannot exceed 50 caracters");
    } else {
      setError1("");
    }
    setTaskName(value);
  };
  const handleDescriptionLimit = (e) => {
    const value = e.target.value;

    if (value.length > 200) {
      setError2("Description cannot exceed 200 caracters");
    } else {
      setError2("");
    }
    setDescriptionName(value);
  };

  const UpdateTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
    const taskName = form.taskName.value;
    const description = form.description.value;
    const category = form.category.value;
    console.log({ taskName, description, category, date });
    const task = { taskName, description, category, date };
    axiosPublic
      .put(`/tasks/${updateAble?._id}`, task)
      .then((res) => {
        console.log(res);
        refetch();
        handleCloseModal();
        Swal.fire({
          title: "Update Successful",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-center font-bold capitalize text-2xl">
          Update Task
        </h1>
        <div className="divider"></div>
        <form onSubmit={UpdateTask} className="space-y-5">
          <div className="w-full flex flex-col gap-1">
            <label>
              <span className="text-xl fond-bold">
                Task Name <span className="text-sm">- max 50 characters</span>
              </span>
            </label>
            <input
              type="text"
              name="taskName"
              onChange={handleTaskNameLimit}
              value={taskName}
              maxLength={51}
              placeholder="Enter Task Name"
              className="input input-bordered"
              required
              id=""
            />
            {error1 && <span className="text-red-500">{error1}</span>}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label>
              <span className="text-xl fond-bold">
                Task Description{" "}
                <span className="text-sm"> - max 200 characters</span>
              </span>
            </label>
            <textarea
              type="text"
              name="description"
              value={descriptionName}
              onChange={handleDescriptionLimit}
              maxLength={201}
              placeholder="Enter Task Name"
              required
              className="input input-bordered h-20"
            />
            {error2 && <span className="text-red-500">{error2}</span>}
          </div>
          <div>
            <span>select category: </span>
            {updateAble && (
              <>
                <select
                  className="border p-3 rounded-xl"
                  required
                  name="category"
                  defaultValue={updateAble?.category}
                >
                  <option value="to do">To Do</option>
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </select>
              </>
            )}
          </div>
          <input
            type="submit"
            value="Update Task"
            className="btn btn-neutral"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateTask;
