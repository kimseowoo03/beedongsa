import type { ClientUser, EducatorUser } from "./user";

interface FormValidationErrors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  eventEnabled?: string;
  educatorType?: string;
  lectureTopic?: string;
  experience?: string;
  managerName?: string;
  managerPhoneNumber?: string;
  managerEmail?: string;
}

export default function SignUpValidation({
  name,
  email,
  phoneNumber,
  password,
  eventEnabled,
  educatorType,
  lectureTopic,
  experience,
  managerName,
  managerPhoneNumber,
  managerEmail,
}: EducatorUser & ClientUser) {
  const errors: FormValidationErrors = {};

  // if (!name) {
  //   errors.name = '이름이 입력되지 않았습니다.'
  // }

  // if (!phoneNumber) {
  //   //
  //   errors.phoneNumber = '전화 번호가.'
  // }

  // if (!email) {
  //   errors.email = '이메일이 입력되지 않았습니다.';
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
  //   errors.email = '입력된 이메일이 유효하지 않습니다.';
  // }

  // if (!password) {
  //   errors.password = '비밀번호가 입력되지 않았습니다.';
  // } else if (password.length < 8) {
  //   errors.password = '8자 이상의 패스워드를 사용해야 합니다.';
  // }

  return errors;
}
