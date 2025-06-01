import { api } from "./axiosInstance.ts";
import { handleError } from "./handleError.ts";

const getInbox = async () => {
  try {
    const response = await api.get(`/emails/inbox`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inbox:", error);
    return handleError(error);
  }
};

export const apiEmail = {
  getInbox
}