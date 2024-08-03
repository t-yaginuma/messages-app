import React from "react";

type Props = {
  label: string;
  onClick: () => void;
};

export default function TyButton(props: Props) {
  const { label, onClick } = props;

  return <button onClick={onClick}>{label}</button>;
}
