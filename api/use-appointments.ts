import { UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { useApiMutationTwo, useApiQueryTwo } from "./use-api-request";
import { showNotification } from "@/hooks/toastNotication";
import axios from "axios";

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
