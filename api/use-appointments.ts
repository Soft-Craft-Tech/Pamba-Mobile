import { useApiQueryTwo } from "./use-api-request";

export const ENDPOINTS = {
  APPOINTMENTS: "/appointments/my-appointments",
  ALLSERVICES: "/services/all",
  RETRIEVESERVICES: "/services/retrieve/",
  SINGLEAPPOINTMENT: "/appointments/",
  SERVICECATEGORIES: "/services/categories",
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

export const useGetSingleAppointment = (
  appointment_id: string | undefined,
  options = {}
) => {
  return useApiQueryTwo(
    `${ENDPOINTS.SINGLEAPPOINTMENT}${appointment_id}`,
    options
  );
};

export const useGetAllServiceCategories = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.SERVICECATEGORIES, options);
};
