import React from "react";

type Props = {
  label: string;
  type: "submit" | "button";
  isDisabled?: boolean;
  onClick?: () => void;
};

export default function TyButton(props: Props) {
  const { label, type, onClick, isDisabled } = props;

  return (
    <button type={type} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
}
