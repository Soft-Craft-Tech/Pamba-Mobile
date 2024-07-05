import {
  AppointmentResponse,
  BusinessData,
  SingleServicesData,
} from "./query-types";
import { useApiQuery } from "./use-api-request";

export function useServicesQuery() {
  return useApiQuery<BusinessData>("/services/all");
}

export function useSingleServiceQuery(service_id: string | undefined) {
  return useApiQuery<SingleServicesData>(`/services/retrieve/${service_id}`);
}

export function useAllAppointments() {
  return useApiQuery<AppointmentResponse>(`/appointments/my-appointments`);
}
