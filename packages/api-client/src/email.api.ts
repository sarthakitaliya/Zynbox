import { api } from "./axiosInstance.ts";
import { handleError } from "./handleError.ts";

const getEmails = async (filter: string) => {
  try {
    const response = await api.get(`/emails?filter=${filter}`);
    console.log("Fetched emails:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return handleError(error);
  }
};

const getFullEmail = async (threadId: string) => {
  try {
    const response = await api.get(`/emails/body?threadId=${threadId}`);
    console.log("Fetched full email:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching full email:", error);
    return handleError(error);
  }
};

export const apiEmail = {
  getEmails,
  getFullEmail
}