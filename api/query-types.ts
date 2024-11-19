export interface BusinessData {
  services: Service[];
}

export interface Service {
  businessInfo: BusinessInfo;
  serviceInfo: ServiceInfo;
}

interface BusinessInfo {
  active: boolean;
  business_name: string;
  city: string;
  description: string;
  email: string;
  google_map: string;
  id: number;
  join_date: string;
  location: string;
  phone: string;
  profile_img: string;
  rating: string;
  slug: string;
  verified: boolean;
  weekday_closing: string;
  weekday_opening: string;
  weekend_closing: string;
  weekend_opening: string;
}

export interface ServiceInfo {
  business_id: number;
  description: string;
  estimated_service_time: number;
  id: number;
  price: number;
  service: string;
  service_category: number;
  service_image: string;
}

export interface SingleServices {
  business_id: number;
  business_name: string;
  description: string;
  estimated_time_string: string;
  id: number;
  price: number;
  service: string;
  service_category: number;
  service_image: string;
  slug: string;
}

export interface SingleServicesData {
  service: SingleServices;
  staff: any[];
}

export interface Appointment {
  cancelled: boolean;
  comment: string;
  completed: boolean;
  create_at: string;
  date: string;
  description: string;
  id: number;
  imgUrl: string;
  mapUrl: string;
  name: string;
  phone: string;
  service_id: number;
  time: string;
}

export interface AppointmentResponse {
  cancelled: any[]; // Assuming cancelled can be any type of array based on the provided data
  last: null;
  message: string;
  previous: Appointment[];
  upcoming: Appointment[];
}
