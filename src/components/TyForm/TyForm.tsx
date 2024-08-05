import React from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
};

export default function TyForm(props: Props) {
  const { children, onSubmit } = props;
  return (
    <form action="" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
