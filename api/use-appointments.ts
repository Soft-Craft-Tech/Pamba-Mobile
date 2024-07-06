import { useApiQueryTwo } from "./use-api-request";

export const ENDPOINTS = {
  APPOINTMENTS: "/appointments/my-appointments",
  ALLSERVICES: "/services/all",
  RETRIEVESERVICES: "/services/retrieve/",
};

export const useGetAllAppointments = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.APPOINTMENTS, options);
};

export const useGetAllServices = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.ALLSERVICES, options);
};
export const useGetASingleService = (
  service_id: string | undefined,
  options = {}
) => {
  return useApiQueryTwo(`${ENDPOINTS.RETRIEVESERVICES}${service_id}`, options);
};
