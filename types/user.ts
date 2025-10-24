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
      field_user_perfildeodi: string;
      uid: string;
      mail: string;
      name: string;
      roles: {
        [key: string]: string;
      };
    };
    sessid: string;
    session_name: string;
    token: string;
};

export type TLoginUser = {
  email: string;
  password: string;
}