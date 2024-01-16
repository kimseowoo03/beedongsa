/**react, next */
import { useMutation } from "@tanstack/react-query";

/**style */
import styled from "@emotion/styled";

/**hooks */
import useForm from "@/hooks/useForm";

/**components */
import SubmitButton from "../../Atoms/Button";
import InputLabel from "../../Molecules/InputLabel";

/**상태관리 */
import { useSetAtom } from "jotai";
import { resetPasswordPageNextAtom } from "@/atoms/reset-password/action";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const sendEmailPost = async (email: string): Promise<any> => {
  const response = await fetch("/api/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }

  return response.json();
};

export const ResetPasswordRequest = () => {
  const { values, handleChange } = useForm({
    initialValues: {
      email: "",
    },
  });
  const next = useSetAtom(resetPasswordPageNextAtom);

  const mutation = useMutation({
    mutationFn: sendEmailPost,
  });

  if (mutation.isError) {
    alert(`Error__reset-password_>>: ${mutation.error.message}`);
    mutation.reset(); // 상태 초기화
  }

  if (mutation.isSuccess) {
    next();
  }

  const sendEmailHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(values.email);
  };

  return (
    <Form onSubmit={sendEmailHandler}>
      <p className="title">비밀번호 재설정</p>
      <p className="description">
        이메일을 입력하시며 비밀번호 재설정 안내 메일이 전송됩니다.
      </p>
      <InputLabel
        label="이메일"
        type="text"
        name="email"
        placeholder="이메일을 입력해주세요."
        value={values.email}
        handleChange={(event) => handleChange(event)}
      />
      <SubmitButton
        text={mutation.isPending ? "로딩중" : "전송하기"}
        type="submit"
        disabled={!values.email || mutation.isPending}
      />
    </Form>
  );
};
