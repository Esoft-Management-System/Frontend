export interface IStudent {
  eNumber: string;
  fullName: string;
  contactNumber: string;
  dateOfBirth: string; // "YYYY-MM-DD"
  nic: string;
  emailAddress: string;
  address: string;
  password: string;
  confirmPassword: string;
}

// Login request interface
export interface IStudentLogin {
  eNumber: string;
  password: string;
  rememberMe: boolean;
}

// Login response interface
export interface IStudentLoginResponse {
  tokenType: string;
  token: string;
  student: {
    _id: string;
    eNumber: string;
    fullName: string;
    email: string;
    contactNumber: string;
    dateOfBirth: string;
    nic: string;
    address: string;
    role: string;
  };
}

export interface IStudentState {
  data: IStudent[];
  loading: boolean;
  error: string | null;
  authToken: string | null;
  currentStudent: IStudentLoginResponse['student'] | null;
}