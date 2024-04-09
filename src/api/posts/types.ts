export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type AllBusiness = {
  active: boolean;
  business_name: string;
  category: string;
  city: string;
  email: string;
  google_map: string;
  id: number;
  join_date: string;
  location: string;
  phone: string;
  profile_img: string;
  slug: string;
  verified: boolean;
};
export type AllAppointments = {
  name: string;
  location: string;
  cancelled: boolean;
  comment: string;
  completed: boolean;
  create_at: string;
  description: string;
  date: string;
  id: number;
  time: string;
  imgUrl: string;
  mapUrl: string;
};

type Business = {
  category: string;
  google_map: string;
  id: string;
  location: string;
  name: string;
  phone: string;
  imageUrl: string;
  description: string;
};

type Services = {
  description: string;
  id: number;
  price: number;
  service: string;
};

export type SingleBusiness = {
  business: Business;
  ratingsAverage: string;
  services: Services[];
};
