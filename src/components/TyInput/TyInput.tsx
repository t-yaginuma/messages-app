import React from "react";

type Props = {
  type?: "text" | "email" | "password" | "date";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TyInput(props: Props) {
  const { onChange, type = "text", value } = props;
  return <input value={value} type={type} onChange={onChange} />;
}
