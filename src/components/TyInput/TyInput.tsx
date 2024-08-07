import classNames from "classnames";
import React from "react";
import styles from "@/components/TyInput/TyInput.module.scss";
type Props = {
  type?: "text" | "email" | "password" | "date";
  value?: string;
  name?: string;
  isRequired?: boolean;
  isError?: boolean;
  minDate?: string | number;
  maxDate?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function TyInput(props: Props) {
  const {
    onChange,
    type = "text",
    name,
    isRequired,
    isError,
    value,
    minDate,
    maxDate,
    placeholder,
  } = props;

  return (
    <input
      className={classNames({ [styles["ty-input--error"]]: isError })}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      required={isRequired}
      min={minDate}
      max={maxDate}
      placeholder={placeholder}
    />
  );
}
