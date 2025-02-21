import { GrInProgress } from "react-icons/gr";
import { MdOutlineDownloadDone } from "react-icons/md";
import { PiTargetBold } from "react-icons/pi";
import useGetTask from "../hooks/useGetTask";
import TaskCard from "./TaskCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const TaskManagement = () => {
      const [data, refetch, isLoading] = useGetTask();
      const axiosPublic = useAxiosPublic();
      const toDoData = data?.filter(datas => datas.category == 'to do')
      const pendingData = data?.filter(datas => datas.category == 'pending')
      const doneData = data?.filter(datas => datas.category == 'done')

      const handleDelete = (id) =>{
            axiosPublic.delete(`/tasks/${id}`)
            .then(res =>{
                  console.log(res);
                  refetch()
            }).catch(error =>{
                  console.log(error)
            })
      }

      return (
            <div className="grid grid-cols-1 md:grid-cols-2 text-black lg:grid-cols-3 gap-5">
                  <div className="border rounded-xl">
                        <div className="bg-gray-400 py-5 rounded-xl">
                              <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center"><PiTargetBold /> To Do</h1>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                              {
                                    !isLoading && toDoData?.map( task => <TaskCard key={task._id} task={task} handleDelete={handleDelete}></TaskCard>)
                              }
                        </div>
                  </div>
                  <div className="border rounded-xl">
                        <div className="bg-gray-400 py-5 rounded-xl">
                              <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center"><GrInProgress /> doing</h1>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                              {
                                    !isLoading && pendingData?.map( task => <TaskCard key={task._id} task={task} handleDelete={handleDelete}></TaskCard>)
                              }
                        </div>
                  </div>
                  <div className="border rounded-xl">
                        <div className="bg-gray-400 py-5 rounded-xl">
                              <h1 className="text-2xl font-bold uppercase flex items-center gap-2 justify-center"><MdOutlineDownloadDone /> done</h1>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                              {
                                    !isLoading && doneData?.map( task => <TaskCard key={task._id} task={task} handleDelete={handleDelete}></TaskCard>)
                              }
                        </div>
                  </div>
            </div>
      );
};

export default TaskManagement;