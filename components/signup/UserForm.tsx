/**react, next */
import { useState } from "react";

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

  const [etcLectureTopic, setEtcLectureTopic] = useState("");

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
  console.log(values.lectureTopic, "lectureTopic");
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
          <div>
            <InputField
              label="미술/공예"
              type="checkbox"
              name="lectureTopic"
              id="미술/공예"
              value="미술/공예"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("미술/공예")}
            />
            <InputField
              label="체육/건강"
              type="checkbox"
              name="lectureTopic"
              id="체육/건강"
              value="체육/건강"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("체육/건강")}
            />
            <InputField
              label="음악"
              type="checkbox"
              name="lectureTopic"
              id="음악"
              value="음악"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("음악")}
            />
            <InputField
              label="문화 심리"
              type="checkbox"
              name="lectureTopic"
              id="문화 심리"
              value="문화 심리"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("문화 심리")}
            />
            <InputField
              label="요리/베이킹"
              type="checkbox"
              name="lectureTopic"
              id="요리/베이킹"
              value="요리/베이킹"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("요리/베이킹")}
            />
            <InputField
              label="실무교육/조직문화"
              type="checkbox"
              name="lectureTopic"
              id="실무교육/조직문화"
              value="실무교육/조직문화"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("실무교육/조직문화")}
            />
            <InputField
              label="외국어"
              type="checkbox"
              name="lectureTopic"
              id="외국어"
              value="외국어"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("외국어")}
            />
            <InputField
              label="경영/경제/마케팅"
              type="checkbox"
              name="lectureTopic"
              id="경영/경제/마케팅"
              value="경영/경제/마케팅"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("경영/경제/마케팅")}
            />
            <InputField
              label="수학/과학"
              type="checkbox"
              name="lectureTopic"
              id="수학/과학"
              value="수학/과학"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("수학/과학")}
            />
            <InputField
              label="컴퓨터/IT"
              type="checkbox"
              name="lectureTopic"
              id="컴퓨터/IT"
              value="컴퓨터/IT"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("컴퓨터/IT")}
            />
            <InputField
              label="취업/자기개발"
              type="checkbox"
              name="lectureTopic"
              id="취업/자기개발"
              value="취업/자기개발"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("취업/자기개발")}
            />
            <InputField
              label="취미/실용/스포츠"
              type="checkbox"
              name="lectureTopic"
              id="취미/실용/스포츠"
              value="취미/실용/스포츠"
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes("취미/실용/스포츠")}
            />
            <InputField
              label="기타"
              type="checkbox"
              name="lectureTopic"
              id={etcLectureTopic}
              value={etcLectureTopic}
              handleChange={(event) => handleChange(event)}
              checked={values.lectureTopic.includes(etcLectureTopic)}
            >
              <input
                type="text"
                name="etcLectureTopic"
                value={etcLectureTopic}
                onChange={(e) => setEtcLectureTopic(e.target.value)}
              />
            </InputField>
          </div>
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
