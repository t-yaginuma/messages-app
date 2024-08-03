import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function TyForm(props: Props) {
  const { children } = props;
  return <form action="">{children}</form>;
}
