import type { IStaff, IStaffLogin } from "../redux/interfaces/staff";
import APIRequest from "./api-request";

class StaffService extends APIRequest {
  //request
  async requestsStaff(staffData: IStaff) {
    return this.post("/staff-requests", staffData);
  }

  async loginStaff(loginData: IStaffLogin) {
    return this.post("/auth/staff-login", loginData);
  }

  async sendTempPasswordCode(tempToken: string) {
    // API expects the token in the body as temporarySessionToken
    return this.post("/auth/temp-password/send-code", {
      temporarySessionToken: tempToken,
    });
  }

  async verifyTempPasswordCode(tempToken: string, code: string) {
    return this.post("/auth/temp-password/verify", {
      temporarySessionToken: tempToken,
      code,
    });
  }

  async setTempPassword(resetToken: string, newPassword: string, confirmNewPassword: string) {
    return this.post("/auth/temp-password/set", {
      resetToken,
      newPassword,
      confirmNewPassword,
    });
  }
}
export const staffService = new StaffService();
