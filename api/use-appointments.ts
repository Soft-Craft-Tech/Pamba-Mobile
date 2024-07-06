import {
  AppointmentResponse,
  BusinessData,
  SingleServicesData,
} from "./query-types";
import { useApiQuery, useApiQueryTwo } from "./use-api-request";

export const ENDPOINTS = {
  APPOINTMENTS: "/appointments/my-appointments",
  ALLSERVICES: "/services/all",
};

export function useServicesQuery() {
  return useApiQuery<BusinessData>("/services/all");
}

export function useSingleServiceQuery(service_id: string | undefined) {
  return useApiQuery<SingleServicesData>(`/services/retrieve/${service_id}`);
}

export const useGetAllAppointments = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.APPOINTMENTS, options);
};

export const useGetAllServices = (options = {}) => {
  return useApiQueryTwo(ENDPOINTS.ALLSERVICES, options);
};
