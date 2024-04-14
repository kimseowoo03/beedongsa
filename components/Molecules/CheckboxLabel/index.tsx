import React, { memo } from "react";

import styled from "@emotion/styled";
import CheckIcon from "@/public/icon/check.svg";

const CheckboxWrap = styled.div<{ display: "flex" | "inline-flex" }>`
  display: ${({ display }) => display};

  path {
    fill: var(--gray-03);
  }

  .checkboxInput {
    display: none;
  }

  input[type="checkbox"]:checked + label path {
    fill: var(--primary-color-y);
  }

  label {
    display: inline-flex;
    gap: var(--gap-02);
    align-items: center;
    font-size: var(--font-size-xs);
    margin-right: 20px;
    margin-bottom: var(--gap-02);
    cursor: pointer;
  }

  &:hover {
    path {
      fill: var(--primary-color-y);
    }
  }
`;

const MultipleSelectionWrap = styled.div`
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

interface MultipleSelectionProps {
  values: Array<string> | string;
  children: React.ReactNode;
}
/**
 * `MultipleSelectionMain` 컴포넌트는 여러 선택 항목을 처리하기 위한 래퍼입니다.
 * 이 컴포넌트는 자식 컴포넌트를 `MultipleSelectionWrap` 컴포넌트로 감싸서 렌더링합니다.
 * 주로 렌더링 최적화를 위해 사용되며, `React.memo` 등을 사용하여 메모이제이션할 때 유용합니다.
 *
 * Props:
 * - `values`: 선택된 항목들의 배열이나 단일 값입니다.
 *    이 값은 컴포넌트의 상태나 동작을 결정하는데 사용됩니다.
 * - `children`: `MultipleSelectionMain` 안에 렌더링될 자식 요소들입니다.
 *    이들은 `MultipleSelectionWrap`으로 감싸져서 표시됩니다.
 */
function MultipleSelectionMain({ children, values }: MultipleSelectionProps) {
  return <MultipleSelectionWrap>{children}</MultipleSelectionWrap>;
}

interface CheckboxLabelProps {
  display?: "flex" | "inline-flex";
  label?: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: (name: string, type, checked: boolean, newValue) => void;
  checked?: boolean;
  id?: string;
  children?: React.ReactNode;
}
function CheckboxLabel({
  display = "inline-flex",
  label,
  name,
  value,
  onChange,
  checked,
  id,
  children,
}: CheckboxLabelProps) {
  const handleInputChange = (event) => {
    const { name, value: newValue, type, checked } = event.target;
    onChange(name, type, checked, newValue);
  };

  return (
    <CheckboxWrap display={display}>
      <input
        className="checkboxInput"
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleInputChange}
      />
      <label htmlFor={id}>
        <CheckIcon className="checkbox-icon" />
        {label}
      </label>
      {children}
    </CheckboxWrap>
  );
}

/**
 * areEqual` 함수는 props가 변경되었는지 여부를 판단하는 데 사용됩니다.
 * @param prevProps
 * @param nextProps
 * @returns boolean
 */
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.values === nextProps.values &&
    React.Children.toArray(prevProps.children).toString() ===
      React.Children.toArray(nextProps.children).toString()
  );
};

/**
 * `MultipleSelection`은 `MultipleSelectionMain` 컴포넌트를 React의 `memo` 함수를 사용하여 메모이제이션된 버전으로 확장한 컴포넌트입니다.
 * 이렇게 함으로써, 동일한 props가 전달될 경우 불필요한 리렌더링을 방지하여 성능을 최적화합니다.
 *
 * CheckboxLabel를 최적화 할 필요 없다면 MultipleSelection으로 안 감싸도 됩니다.
 *
 * 사용 예:
 * <MultipleSelection values={selectedValues}>
 *   <MultipleSelection.CheckboxLabel>항목 1</MultipleSelection.CheckboxLabel>
 *   <MultipleSelection.CheckboxLabel>항목 2</MultipleSelection.CheckboxLabel>
 * </MultipleSelection>
 */
export const MultipleSelection = Object.assign(
  memo(MultipleSelectionMain, areEqual),
  {
    CheckboxLabel,
  }
);
