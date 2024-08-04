import React from "react";

type Props = {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function TyButton(props: Props) {
  const { label, onClick, isDisabled } = props;

  return (
    <button onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
}
