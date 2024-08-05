import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function TyInput(props: Props) {
  const { label, children } = props;
  return (
    <div>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}
