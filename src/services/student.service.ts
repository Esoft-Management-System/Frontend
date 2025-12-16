import type { IStudent, IStudentLogin } from "../redux/interfaces/student";
import APIRequest, { STUDENT_DATA_KEY, STUDENT_TOKEN_KEY } from "./api-request";

class StudentService extends APIRequest {
  async getStudentReg() {
    return this.get("/student-reg");
  }

  //register studeny
  async registerStudent(studentData: IStudent) {
    return this.post("/student-reg", studentData);
  }

  async loginStudent(loginData: IStudentLogin) {
     const response = await this.post("/auth/student-login", loginData);
     // Store token and data based on rememberMe
    const storage = loginData.rememberMe ? localStorage : sessionStorage;
    const data = response.data as { token: string; student: IStudent };
    storage.setItem(STUDENT_TOKEN_KEY, data.token);
    storage.setItem(STUDENT_DATA_KEY, JSON.stringify(data.student));
    
    return response;

  }
}

export const studentService = new StudentService();
