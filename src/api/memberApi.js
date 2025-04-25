import axiosInstance from "./axios";

export const fetchMembers = async (filters, page, sortOption) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );

  // 정렬 옵션 매핑
  const sortMapping = {
    lastLoginDesc: { sortBy: "lastLoginAt", order: "desc" },
    lastLoginAsc: { sortBy: "lastLoginAt", order: "asc" },
    createdAtDesc: { sortBy: "createdAt", order: "desc" },
    createdAtAsc: { sortBy: "createdAt", order: "asc" },
  };

  const { sortBy, order } = sortMapping[sortOption] || {
    sortBy: "lastLoginAt",
    order: "desc",
  };

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
