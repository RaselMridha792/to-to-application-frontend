import axios from "axios";

const axiosPublic = axios.create({
      baseURL: 'https://to-do-application-backend-beige.vercel.app/'
})

const useAxiosPublic = () => {
      return axiosPublic
  };
  
  export default useAxiosPublic;