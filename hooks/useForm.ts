import { useState } from "react";

interface useFormProps<T> {
  initialValues: T;
}

const useForm = <T extends {}>({ initialValues }: useFormProps<T>) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // 'checkbox' 타입의 경우, 'checked'는 boolean 값이며, 이 경우 'value'는 빈 문자열로 설정합니다.
    const { name, value, checked } = event.target as HTMLInputElement;

    setValues((prevValues) => {
      // 배열로 값을 관리하는 경우
      if (Array.isArray(prevValues[name])) {
        return {
          ...prevValues,
          [name]: prevValues[name].includes(value)
            ? prevValues[name].filter((item: string) => item !== value) // 값 제거
            : [...prevValues[name], value], // 값 추가
        };
      }

      // 일반적인 input 값 업데이트
      return {
        ...prevValues,
        [name]: value || checked,
      };
    });

    //TODO: 유효성 검사에 따라 error 로직 추가
  };

  // 추가적인 로직 (예: 폼 제출 처리,  등)

  return { values, setValues, handleChange };
};

export default useForm;
