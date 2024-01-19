/**react, next */
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

/**style */
import styled from "@emotion/styled";

/**상태관리 */

/**hooks */
import useForm from "@/hooks/useForm";

/**components */
import SubmitButton from "../../Atoms/Button";
import InputLabel from "../../Molecules/InputLabel";

/**
 *
 * @param formData - email, password를 받습니다.
 * @returns response.json()
 */
const submitSigninForm = async (formData: {
  email: string;
  password: string;
}): Promise<any> => {
  const response = await fetch("/api/signin", {
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

export const Signin = () => {
  const router = useRouter();

  const { values, setValues, handleChange } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitSigninForm,
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: { idToken: string; message: string } =
      await mutation.mutateAsync(values);

    router.push("/");
  };

  const signinDisabled = values.email && values.password && !mutation.isPending;

  return (
    <Wrap>
      <Form onSubmit={submitHandler}>
        <p className="title">로그인</p>
        <div>
          <InputLabel
            label="이메일"
            type="text"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={values.email}
            handleChange={(event) => handleChange(event)}
          />
          <InputLabel
            label="비밀번호"
            type="text"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={values.password}
            handleChange={(event) => handleChange(event)}
          />
        </div>
        <SubmitButton
          text={mutation.isPending ? "로딩중" : "로그인"}
          type="submit"
          disabled={!signinDisabled}
        />
      </Form>
      <AuthLinks>
        <Link href="/signup">회원가입</Link>
        <Link href="/reset-password">비밀번호 재설정</Link>
      </AuthLinks>
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const AuthLinks = styled.div`
  margin-top: var(--gap);
  text-align: center;
  font-size: var(--font-size-xxs);
  color: var(--font-color-1);
  a:first-of-type {
    margin-right: var(--gap);
  }
`;
