/**type */
import type { UserType } from "@/types/user";

/**style */
import styled from "@emotion/styled";

/**hooks */
import useForm from "@/hooks/useForm";

/**components */
import InputField from "../common/InputField";

interface UserFormProps {
  type: UserType;
}

const Wrap = styled.div`
  max-width: 360px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EducatorTypeOptions = styled.div`
  .label {
    color: var(--font-color-1);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-medium);
    margin-bottom: 8px;
  }
  .label::after {
    position: relative;
    left: 2px;
    top: -2px;
    content: "*";
    color: var(--primary-color-r);
  }
`;
const LectureTopicOptions = styled.div`
  .label {
    color: var(--font-color-1);
    font-size: var(--font-size-xxs);
    font-weight: var(--font-weight-medium);
    margin-bottom: 8px;
  }
  .label::after {
    position: relative;
    left: 2px;
    top: -2px;
    content: "*";
    color: var(--primary-color-r);
  }
`;

export const UserForm = ({ type }: UserFormProps) => {
  const submitHandler = () => {};

  //강사/컨설턴트인 경우
  const { values, handleChange } = useForm({
    initialValues: {
      type: "educator",
      name: "",
      email: "",
      phoneNumber: undefined,
      password: "",
      educatorType: ["lecture"],
      lectureTopic: [],
      experience: undefined,
    },
  });

  return (
    <Wrap>
      <Form onSubmit={submitHandler}>
        <p className="title">강의 / 컨설턴트 회원가입</p>
        <InputField
          label="이름"
          type="text"
          name="name"
          placeholder="이름을 입력해주세요."
          value={values.name}
          handleChange={(event) => handleChange(event)}
        />
        <InputField
          label="이메일"
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={values.email}
          handleChange={(event) => handleChange(event)}
        />
        <InputField
          label="휴대폰 번호"
          type="number"
          name="phoneNumber"
          placeholder="ex) 01012345678"
          value={values.phoneNumber}
          handleChange={(event) => handleChange(event)}
        />
        <InputField
          label="비밀번호"
          type="text"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={values.password}
          handleChange={(event) => handleChange(event)}
        />
        <EducatorTypeOptions>
          <div className="label">강의 / 컨설턴트 선택 (다중선택 가능)</div>
          <InputField
            label="강의"
            type="checkbox"
            name="educatorType"
            id="lecture"
            value="lecture"
            handleChange={(event) => handleChange(event)}
            checked={values.educatorType.includes("lecture")}
          />
          <InputField
            label="컨설턴트"
            type="checkbox"
            name="educatorType"
            id="consultant"
            value="consultant"
            handleChange={(event) => handleChange(event)}
            checked={values.educatorType.includes("consultant")}
          />
        </EducatorTypeOptions>
        <LectureTopicOptions>
          <div className="label">강의 컨설턴트 주제</div>
        </LectureTopicOptions>
        <InputField
          label="경력"
          type="number"
          name="experience"
          placeholder="경력을 입력해주세요."
          value={values.experience}
          handleChange={(event) => handleChange(event)}
        />
      </Form>
    </Wrap>
  );
};
