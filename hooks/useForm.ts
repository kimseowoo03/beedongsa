import { useState } from "react";

interface useFormProps<T> {
  initialValues: T;
}

const useForm = <T extends {}>({ initialValues }: useFormProps<T>) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // 'checkbox' 타입의 경우, 'checked'는 boolean 값이며, 해당 값은 배열 또는 boolean을 가집니다.
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setValues((prevValues) => {
      // 배열로 값을 관리하는 경우
      if (Array.isArray(prevValues[name])) {
        return {
          ...prevValues,
          [name]:
            value === ""
              ? []
              : prevValues[name].includes(value)
              ? prevValues[name].filter((item: string) => item !== value)
              : [...prevValues[name], value],
        };
      }

      const newValue = type === "number" ? Number(value) : value;

      // 일반적인 input 값 업데이트
      return {
        ...prevValues,
        [name]: type !== "checkbox" ? newValue : checked,
      };
    });
  };

  // 추가적인 로직 (예: 폼 제출 처리,  등)

  return { values, setValues, handleChange };
};

export default useForm;
