import axiosInstance from "./axios";

export const getDashbord = async () => {
  const response = await axiosInstance.get(`/offices`);
  return response.data;
};
