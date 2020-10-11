import api from "@/services/api";

export const index = async () => {
  let response = await api("users");
  return {
    status: response.status,
    body: await response.json(),
  };
};

export const createUser = async (data) => {
  let response = await api("users", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return {
    status: response.status,
    body: await response.json(),
  };
};
