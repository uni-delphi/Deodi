export type TUser = {
  id: string;
  uid: string;
  name?: string | null;
  lastName: string;
  country: string;
  state: string;
  education: string;
  sector: string;
  institution: string;
  expertees: string;
  years: string;
  mail: string;
  password: string;
  validatedPassword?: string;
  role: string;
  user: {
      uid: string;
      mail: string;
      name: string;
      roles: {
        [key: string]: string;
      };
    };
};

export type TLoginUser = {
  email: string;
  password: string;
}