import api from "@/services/api";

export const index = async () => {
  let response = await api("users");
  return {
    status: response.status,
    body: await response.json(),
  };
};

export const getUser = async (id) => {
  let response = await api(`users/${id}`);
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

export const updateUser = async (id, data) => {
  let response = await api(`users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return {
    status: response.status,
    body: response.status === 204 ? {} : await response.json()
  };
};

export const deleteUser = async (id) => {
  let response = await api(`users/${id}`, {
    method: "DELETE",
  });
  return {
    status: response.status,
    body: response.status === 204 ? {} : await response.json()
  };
};
