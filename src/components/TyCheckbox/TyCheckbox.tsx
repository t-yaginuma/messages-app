import React from "react";

type Props = {
  label: string;
};

export default function TyInput(props: Props) {
  const { label } = props;
  return (
    <div>
      <input type="checkbox" id="scales" name="scales" checked />
      <label for="scales">{label}</label>
    </div>
  );
}
