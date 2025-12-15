import APIRequest from "./api-request";

class StudentService extends APIRequest {
  async getStudentReg() {
    return this.get("/student-reg");
  }
}

export const studentService = new StudentService();
