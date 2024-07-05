import { BusinessData } from "./query-types";
import { useApiQuery } from "./use-api-request";

export function useServicesQuery() {
  return useApiQuery<BusinessData>("/services/all");
}
