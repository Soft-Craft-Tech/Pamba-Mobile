export type SignupVariables = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type VerifcationVariables = {
  email: string;
  otp: string;
};

export type ResendOtpVariables = {
  email: string;
};

export type PasswordRequestVariables = {
  email: string;
};
