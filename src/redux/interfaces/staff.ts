export interface IStaff {
  staffId: string
  fullName: string
  designation: string
  email: string
  reason: string
  role?: "staff" 
}

export interface IStaffState {
  data: IStaff[]
  loading: boolean
  error: string | null;
}