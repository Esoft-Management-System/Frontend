import type { IStudent } from "../redux/interfaces/student";
import APIRequest from "./api-request";

class StudentService extends APIRequest {
  async getStudentReg() {
    return this.get("/student-reg");
  }

  //register studeny
  async registerStudent(studentData: IStudent) {
    return this.post("/student-reg", studentData);
  }
}

export const studentService = new StudentService();
