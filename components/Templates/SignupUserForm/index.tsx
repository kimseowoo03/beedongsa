/**react, next */
import { useCallback, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**type */
import type { ClientUser, EducatorUser, UserType } from "@/types/user";

/**style */
import styled from "@emotion/styled";
import { Hr } from "@/styles/htmlStyles";

/**components */
import SubmitButton from "../../Atoms/Button";
import InputLabel from "../../Molecules/InputLabel";
import { MultipleSelection } from "../../Molecules/CheckboxLabel";

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

export const SignupUserForm = ({ type }: UserFormProps) => {
  const [allAgreed, setAllAgreed] = useState(false);

  const [etcLectureTopic, setEtcLectureTopic] = useState("");
  const router = useRouter();

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
        experience: 0,
        eventEnabled: false,
        serviceTermsAccepted: false,
        privacyPolicyAgreed: false,
        certificate: [],
        etcRecord: [],
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

  const [values, setValues] = useState(initialValues);

  const mutation = useMutation({
    mutationFn: submitSignUpForm,
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(values as EducatorUser | ClientUser, {
      onSuccess: (data) => {
        alert(data.message);
        router.push("/signin");
      },
    });
  };

  if (mutation.isError) {
    alert(`Error___>!>: ${mutation.error.message}`);
    mutation.reset(); // 상태 초기화
  }

  const AllAgreedHandler = () => {
    setAllAgreed(() => !allAgreed);
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

  const onChange = useCallback((name: string, type, checked, newValue) => {
    setValues((prevValues) => {
      if (Array.isArray(prevValues[name])) {
        return {
          ...prevValues,
          [name]:
            newValue === ""
              ? []
              : prevValues[name].includes(newValue)
              ? prevValues[name].filter((item: string) => item !== newValue)
              : [...prevValues[name], newValue],
        };
      }

      const value = type === "number" ? Number(newValue) : newValue;

      return {
        ...prevValues,
        [name]: type !== "checkbox" ? value : checked,
      };
    });
  }, []);

  return (
    <Wrap>
      <Form onSubmit={submitHandler}>
        <p className="title">
          {type === "educator" ? "강사/컨설턴트" : "클라이언트"} 회원가입
        </p>
        {type === "educator" ? (
          <div className="typeForm">
            <InputLabel
              label="이름"
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              value={values.name}
              onChange={onChange}
            />
            <InputLabel
              label="이메일"
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={values.email}
              onChange={onChange}
            />
            <InputLabel
              label="휴대폰 번호"
              type="number"
              name="phoneNumber"
              placeholder="ex) 01012345678"
              value={values.phoneNumber}
              onChange={onChange}
            />
            <InputLabel
              label="비밀번호"
              type="text"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={values.password}
              onChange={onChange}
            />
            <MultipleSelection values={values.educatorType}>
              <div className="label">강의 / 컨설턴트 선택 (다중선택 가능)</div>
              <MultipleSelection.CheckboxLabel
                label="강의"
                type="checkbox"
                name="educatorType"
                id="lecture"
                value="lecture"
                onChange={onChange}
                checked={values.educatorType.includes("lecture")}
              />
              <MultipleSelection.CheckboxLabel
                label="컨설턴트"
                type="checkbox"
                name="educatorType"
                id="consultant"
                value="consultant"
                onChange={onChange}
                checked={values.educatorType.includes("consultant")}
              />
            </MultipleSelection>
            <MultipleSelection values={values.lectureTopic}>
              <div className="label">강의 컨설턴트 주제</div>
              <div>
                <MultipleSelection.CheckboxLabel
                  label="미술/공예"
                  type="checkbox"
                  name="lectureTopic"
                  id="미술/공예"
                  value="미술/공예"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("미술/공예")}
                />
                <MultipleSelection.CheckboxLabel
                  label="체육/건강"
                  type="checkbox"
                  name="lectureTopic"
                  id="체육/건강"
                  value="체육/건강"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("체육/건강")}
                />
                <MultipleSelection.CheckboxLabel
                  label="음악"
                  type="checkbox"
                  name="lectureTopic"
                  id="음악"
                  value="음악"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("음악")}
                />
                <MultipleSelection.CheckboxLabel
                  label="문화 심리"
                  type="checkbox"
                  name="lectureTopic"
                  id="문화 심리"
                  value="문화 심리"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("문화 심리")}
                />
                <MultipleSelection.CheckboxLabel
                  label="요리/베이킹"
                  type="checkbox"
                  name="lectureTopic"
                  id="요리/베이킹"
                  value="요리/베이킹"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("요리/베이킹")}
                />
                <MultipleSelection.CheckboxLabel
                  label="실무교육/조직문화"
                  type="checkbox"
                  name="lectureTopic"
                  id="실무교육/조직문화"
                  value="실무교육/조직문화"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("실무교육/조직문화")}
                />
                <MultipleSelection.CheckboxLabel
                  label="외국어"
                  type="checkbox"
                  name="lectureTopic"
                  id="외국어"
                  value="외국어"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("외국어")}
                />
                <MultipleSelection.CheckboxLabel
                  label="경영/경제/마케팅"
                  type="checkbox"
                  name="lectureTopic"
                  id="경영/경제/마케팅"
                  value="경영/경제/마케팅"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("경영/경제/마케팅")}
                />
                <MultipleSelection.CheckboxLabel
                  label="수학/과학"
                  type="checkbox"
                  name="lectureTopic"
                  id="수학/과학"
                  value="수학/과학"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("수학/과학")}
                />
                <MultipleSelection.CheckboxLabel
                  label="컴퓨터/IT"
                  type="checkbox"
                  name="lectureTopic"
                  id="컴퓨터/IT"
                  value="컴퓨터/IT"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("컴퓨터/IT")}
                />
                <MultipleSelection.CheckboxLabel
                  label="취업/자기개발"
                  type="checkbox"
                  name="lectureTopic"
                  id="취업/자기개발"
                  value="취업/자기개발"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("취업/자기개발")}
                />
                <MultipleSelection.CheckboxLabel
                  label="취미/실용/스포츠"
                  type="checkbox"
                  name="lectureTopic"
                  id="취미/실용/스포츠"
                  value="취미/실용/스포츠"
                  onChange={onChange}
                  checked={values.lectureTopic.includes("취미/실용/스포츠")}
                />
                <MultipleSelection.CheckboxLabel
                  label="기타"
                  type="checkbox"
                  name="lectureTopic"
                  id={etcLectureTopic}
                  value={etcLectureTopic}
                  onChange={onChange}
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
                </MultipleSelection.CheckboxLabel>
              </div>
            </MultipleSelection>
          </div>
        ) : (
          <div className="typeForm">
            <InputLabel
              label="이름"
              type="text"
              name="name"
              placeholder="이름을 입력해주세요."
              value={values.name}
              onChange={onChange}
            />
            <InputLabel
              label="이메일"
              type="text"
              name="email"
              placeholder="이메일을 입력해주세요."
              value={values.email}
              onChange={onChange}
            />
            <InputLabel
              label="휴대폰 번호"
              type="number"
              name="phoneNumber"
              placeholder="ex) 01012345678"
              value={values.phoneNumber}
              onChange={onChange}
            />
            <InputLabel
              label="비밀번호"
              type="text"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              value={values.password}
              onChange={onChange}
            />
            <InputLabel
              label="담당자 이름"
              type="text"
              name="managerName"
              placeholder="담당자 이름을 입력해주세요."
              value={values.managerName}
              onChange={onChange}
            />
            <InputLabel
              label="담당자 이메일"
              type="text"
              name="managerEmail"
              placeholder="담당자 이메일을 입력해주세요."
              value={values.managerEmail}
              onChange={onChange}
            />
            <InputLabel
              label="담당자 직통 번호"
              type="number"
              name="managerPhoneNumber"
              placeholder="ex) 01012345678"
              value={values.managerPhoneNumber}
              onChange={onChange}
            />
          </div>
        )}
        <div>
          <MultipleSelection.CheckboxLabel
            label="전체동의"
            type="checkbox"
            name="serviceTermsAccepted"
            id="전체동의"
            value={undefined}
            onChange={AllAgreedHandler}
            checked={allAgreed}
          />
          <Hr />
          <div>
            <MultipleSelection.CheckboxLabel
              label="이용약관 동의 (필수)"
              type="checkbox"
              name="serviceTermsAccepted"
              id="이용약관 동의"
              value={undefined}
              onChange={onChange}
              checked={values.serviceTermsAccepted}
            />
            <MultipleSelection.CheckboxLabel
              label="개인 정보 제 3자 제공 동의 (필수)"
              type="checkbox"
              name="privacyPolicyAgreed"
              id="개인 정보 제 3자 제공 동의"
              value={undefined}
              onChange={onChange}
              checked={values.privacyPolicyAgreed}
            />
            <MultipleSelection.CheckboxLabel
              label="서비스명 알람 수신 동의 (선택)"
              type="checkbox"
              name="eventEnabled"
              id="서비스명 알람 수신 동의"
              value={undefined}
              onChange={onChange}
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

const EtcInput = styled.input`
  width: 80px;
  box-sizing: border-box;
  padding: 4px;
  border: none;
  border-bottom: 1px solid var(--gray-03);

  &:focus {
    outline: none;
  }
`;
