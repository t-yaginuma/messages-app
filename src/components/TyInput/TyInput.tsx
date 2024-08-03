import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TyInput(props: Props) {
  const { onChange } = props;
  return <input type="text" onChange={onChange} />;
}
