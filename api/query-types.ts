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

interface ServiceInfo {
  business_id: number;
  description: string;
  estimated_service_time: number;
  id: number;
  price: number;
  service: string;
  service_category: number;
  service_image: string;
}
