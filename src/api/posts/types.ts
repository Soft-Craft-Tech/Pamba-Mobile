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
