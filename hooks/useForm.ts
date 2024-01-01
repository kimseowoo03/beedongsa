import { useState } from "react";

interface useFormProps<T> {
  //제네릭 타입으로 초기값으로 넣은 객체를 그대로 타입으로 사용함
  initialValues: T;
}

const useForm = <T extends {}>({ initialValues }: useFormProps<T>) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
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
        [name]: value,
      };
    });

    //TODO: 유효성 검사에 따라 error 로직 추가
  };

  // 추가적인 로직 (예: 폼 제출 처리,  등)

  return { values, handleChange };
};

export default useForm;
