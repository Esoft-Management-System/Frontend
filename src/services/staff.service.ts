import type { IStaff } from "../redux/interfaces/staff";
import APIRequest from "./api-request";

class StaffService extends APIRequest {
  //request
  async requestsStaff(staffData: IStaff) {
    return this.post("/staff-requests", staffData);
  }
}
export const staffService = new StaffService();
