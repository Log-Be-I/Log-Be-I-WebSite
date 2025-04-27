import axiosInstance from "./axios";

export const fetchMembers = async (filters, page, sortBy, order) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );
  console.log("📢 API 요청 params:", {
    page,
    size: 10,
    sortBy,
    order,
    ...cleanedFilters,
  });
  const response = await axiosInstance.get("/members", {
    params: {
      page,
      size: 10,
      sortBy,
      order,
      ...cleanedFilters,
    },
  });

  return response.data;
};
export default fetchMembers;
