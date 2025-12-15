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

export interface IStudentState {
  data: IStudent[];
  loading: boolean;
  error: string | null;
}
