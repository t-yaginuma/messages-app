import classNames from "classnames";
import React from "react";
import styles from "@/components/TyTextArea/TyTextArea.module.scss";

type Props = {
  value?: string;
  name?: string;
  isRequired?: boolean;
  isError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
};

export default function TyInput(props: Props) {
  const { name, isRequired, isError, value, placeholder, maxLength } = props;

  return (
    <textarea
      className={classNames({ [styles["ty-text-area--error"]]: isError })}
      value={value}
      name={name}
      required={isRequired}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}
