import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useGetTask = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const axiosPublic = useAxiosPublic();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["tasks", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${email}`);
      return res.data;
    },
  });
  return [data, refetch, isLoading];
};

export default useGetTask;
