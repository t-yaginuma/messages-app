import React from "react";

type Props = {
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TyFileUpload(props: Props) {
  const { onChange, name } = props;

  return (
    <input
      type="file"
      accept=".png,.jpeg,.jpg"
      onChange={onChange}
      name={name}
    />
  );
}
