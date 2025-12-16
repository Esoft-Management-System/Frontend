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

  async requestForgotPassword(email: string, role: string) {
    return this.post("/auth/forgot-password/request", {
      email,
      role,
    });
  }

  async verifyForgotPassword(forgotSessionToken: string, verificationCode: string) {
    return this.post("/auth/forgot-password/verify", {
      forgotSessionToken,
      verificationCode,
    });
  }

  async resendForgotPassword(forgotSessionToken: string) {
    return this.post("/auth/forgot-password/resend", {
      forgotSessionToken,
    });
  }

  async resetForgotPassword(resetToken: string, newPassword: string, confirmNewPassword: string) {
    return this.post("/auth/forgot-password/reset", {
      resetToken,
      newPassword,
      confirmNewPassword,
    });
  }
}
export const staffService = new StaffService();
