/**react, next */
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

/**type */
import type { ClientUser, EducatorUser, UserType } from "@/types/user";

/**style */
import styled from "@emotion/styled";
import { Hr } from "@/styles/htmlStyles";

/**hooks */
import useForm from "@/hooks/useForm";

/**components */
import InputField from "../common/InputField";
import SubmitButton from "../common/Button";

interface UserFormProps {
  type: UserType;
}

/**
 *
 * @param {EducatorUser | ClientUser} formData - 강사/컨설턴트 또는 클라이언트 FormData 객체를 받습니다.
 * @returns
 */
const submitSignUpForm = async (
  formData: EducatorUser | ClientUser
): Promise<any> => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

export const UserForm = ({ type }: UserFormProps) => {
  const [allAgreed, setAllAgreed] = useState(false);

  const [etcLectureTopic, setEtcLectureTopic] = useState("");

  /**
   * 선택된 사용자 타입에 따라 초기값을 설정합니다.
   *
   * @param {UserType} selectedType - 선택된 사용자 타입 ('client' 또는 'educator')
   * @returns 초기값 객체를 반환합니다.
   */

  const initialValues = useMemo(() => {
    if (type === "educator") {
      return {
        type: "educator",
        name: "",
        email: "",
        phoneNumber: undefined,
        password: "",
        educatorType: ["lecture"],
        lectureTopic: [],
        experience: undefined,
        serviceTermsAccepted: false,
        privacyPolicyAgreed: false,
        eventEnabled: false,
      };
    } else if (type === "client") {
      return {
        type: "client",
        name: "",
        email: "",
        phoneNumber: undefined,
        password: "",
        managerName: "",
        managerPhoneNumber: undefined,
        managerEmail: "",
        serviceTermsAccepted: false,
        privacyPolicyAgreed: false,
        eventEnabled: false,
      };
    }
  }, [type]);

  // useForm 훅에 초기값을 설정
  const { values, setValues, handleChange } = useForm({
    initialValues,
  });

  const mutation = useMutation({
    mutationFn: submitSignUpForm,
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(values as EducatorUser | ClientUser);
  };

  if (mutation.isError) {
    alert(`Error___>!>: ${mutation.error.message}`);
    mutation.reset(); // 상태 초기화
  }

  const AllAgreedHandler = () => {
    //TODO: 만약 하나라도 false면 전체동의 false로 변경하기
    setAllAgreed(!allAgreed);
    setValues((prev) => ({
      ...prev,
      serviceTermsAccepted: !allAgreed,
      privacyPolicyAgreed: !allAgreed,
      eventEnabled: !allAgreed,
    }));
  };

  //TODO: 추후에 인풋값에 따라 조건 추가하기
  const signupDisabled =
    values.serviceTermsAccepted &&
    values.privacyPolicyAgreed &&
    !mutation.isPending;

  return (
    <Wrap>
      <Form onSubmit={submitHandler}>
        <p className="title">
          {type === "educator" ? "강사/컨설턴트" : "클라이언트"} 회원가입
        </p>
        {type === "educator" ? (
          <div className="typeForm">
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
                  <EtcInput
                    type="text"
                    placeholder="입력 후 체크"
                    name="etcLectureTopic"
                    value={etcLectureTopic}
                    onChange={(e) => setEtcLectureTopic(e.target.value)}
                    disabled={values.lectureTopic.includes(etcLectureTopic)}
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
          </div>
        ) : (
          <div className="typeForm">
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
            <InputField
              label="담당자 이름"
              type="text"
              name="managerName"
              placeholder="담당자 이름을 입력해주세요."
              value={values.managerName}
              handleChange={(event) => handleChange(event)}
            />
            <InputField
              label="담당자 이메일"
              type="text"
              name="managerEmail"
              placeholder="담당자 이메일을 입력해주세요."
              value={values.managerEmail}
              handleChange={(event) => handleChange(event)}
            />
            <InputField
              label="담당자 직통 번호"
              type="number"
              name="managerPhoneNumber"
              placeholder="ex) 01012345678"
              value={values.managerPhoneNumber}
              handleChange={(event) => handleChange(event)}
            />
          </div>
        )}
        <div>
          <InputField
            label="전체동의"
            type="checkbox"
            name="serviceTermsAccepted"
            id="전체동의"
            value=""
            handleChange={AllAgreedHandler}
            checked={allAgreed}
          />
          <Hr />
          <div>
            <InputField
              label="이용약관 동의 (필수)"
              type="checkbox"
              name="serviceTermsAccepted"
              id="이용약관 동의"
              value=""
              handleChange={(event) => handleChange(event)}
              checked={values.serviceTermsAccepted}
            />
            <InputField
              label="개인 정보 제 3자 제공 동의 (필수)"
              type="checkbox"
              name="privacyPolicyAgreed"
              id="개인 정보 제 3자 제공 동의"
              value=""
              handleChange={(event) => handleChange(event)}
              checked={values.privacyPolicyAgreed}
            />
            <InputField
              label="서비스명 알람 수신 동의 (선택)"
              type="checkbox"
              name="eventEnabled"
              id="서비스명 알람 수신 동의"
              value=""
              handleChange={(event) => handleChange(event)}
              checked={values.eventEnabled}
            />
          </div>
        </div>
        <SubmitButton
          text={mutation.isPending ? "로딩중" : "가입하기"}
          type="submit"
          disabled={!signupDisabled}
        />
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 360px;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  > .typeForm {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
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

const EtcInput = styled.input`
  width: 80px;
  box-sizing: border-box;
  padding: 4px;
  border: none;
  border-bottom: 1px solid var(--gray-sub1);

  &:focus {
    outline: none;
  }
`;
