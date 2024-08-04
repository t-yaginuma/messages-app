import React from "react";

type Props = {
  label: string;
  value: boolean;
  isDisabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TyInput(props: Props) {
  const { label, onChange, value, isDisabled } = props;
  return (
    <div>
      <input
        type="checkbox"
        id="check"
        name="check"
        disabled={isDisabled}
        onChange={onChange}
        checked={value}
      />
      <label htmlFor="check">{label}</label>
    </div>
  );
}
