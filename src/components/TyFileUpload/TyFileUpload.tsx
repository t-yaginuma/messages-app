import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TyFileUpload(props: Props) {
  const { onChange } = props;

  return (
    <input
      type="file"
      name="image"
      accept=".png,.jpeg,.jpg"
      onChange={onChange}
    />
  );
}
