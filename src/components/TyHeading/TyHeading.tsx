import React from "react";

type Props = {
  type: "h1" | "h2" | "h3";
  label: string;
};

export default function TyHeading(props: Props) {
  const { type, label } = props;
  return <h1>{label}</h1>;
}
