import { UseMutationOptions } from "@tanstack/react-query";
import {
  useApiMutationTwo,
  useApiQueryTwo,
  usePutMutation,
} from "./use-api-request";

export const ENDPOINTS = {
  APPOINTMENTS: "/appointments/my-appointments",
  ALLSERVICES: "/services/all",
  RETRIEVESERVICES: "/services/retrieve/",
  SINGLEAPPOINTMENT: "/appointments/",
  SERVICECATEGORIES: "/services/categories",
  NOTIFICATIONS: "/notifications/client/all",
  ALLBUSINESSES: "/businesses/all-businesses",
  SINGLEBUSINESS: "/businesses/",
  BOOKAPPOINTMENT: "/appointments/book",
  CLIENTPROFILE: "/clients/retrieve",
  UPDATEPROFILE: "/clients/update-profile",
};

export const useGetAllServices = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.ALLSERVICES, options);
};

export const useGetClientProfile = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.CLIENTPROFILE, options);
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

export const useAllNotifications = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.NOTIFICATIONS, options);
};

export const useAllBusinesses = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.ALLBUSINESSES, options);
};

export const useGetSingleBusiness = (
  slug: string | undefined,
  options = {}
) => {
  return useApiQueryTwo(`${ENDPOINTS.SINGLEBUSINESS}${slug}`, options);
};

export const useGetAllAppointments = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.APPOINTMENTS, options);
};

export function useBookAppointment(
  options?: UseMutationOptions<any, Error, any>
) {
  return useApiMutationTwo<any, any>("/appointments/book", options);
}

export function useRescheduleAppointment(
  appointment_id: string | undefined,
  options?: UseMutationOptions<any, Error, any>
) {
  return usePutMutation<any, any>(
    `/appointments/reschedule${appointment_id}`,
    options
  );
}

export function useCancelAppointment(
  slug: string | undefined,
  options?: UseMutationOptions<any, Error, any>
) {
  return usePutMutation<any, any>(`/appointments/cancel${slug}`, options);
}

export function useUpdateClientProfile(
  options?: UseMutationOptions<any, Error, any>
) {
  return useApiMutationTwo<any, any>(ENDPOINTS.UPDATEPROFILE, options);
}
