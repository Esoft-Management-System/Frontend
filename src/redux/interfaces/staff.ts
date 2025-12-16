export interface IStaff {
  staffId: string;
  fullname: string;
  designation: string;
  email: string;
  reason: string;
  role?: "staff" | "admin";
}

export interface IStaffLogin {
  staffId: string;
  password: string;
  rememberMe: boolean;
}

export interface IStaffLoginResponse {
  tokenType: "staffToken" | "adminToken";
  token: string;
  staff: {
    staffId: string;
    fullname: string;
    email: string;
    role: "staff" | "admin";
    isPasswordTemporary: boolean;
  };
  message?: string;
}

export interface IStaffLoginTemporaryResponse {
  isPasswordTemporary: true;
  forcePasswordChange: boolean;
  temporarySessionToken: string;
  staff?: {
    staffId: string;
    fullname: string;
    email: string;
    role: "staff" | "admin";
    isPasswordTemporary: boolean;
  };
  message?: string;
}

export type IStaffLoginApiResponse = IStaffLoginResponse | IStaffLoginTemporaryResponse;

export interface IStaffState {
  data: IStaff[];
  loading: boolean;
  error: string | null;
  authToken: string | null;
  currentStaff: IStaffLoginResponse["staff"] | null;
}
