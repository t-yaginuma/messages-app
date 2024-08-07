import React from "react";
import style from "@/components/TyText/TyText.module.scss";
import classNames from "classnames";
import { isErrored } from "stream";

type Props = {
  children: React.ReactNode;
  isError?: boolean;
};

export default function TyText(props: Props) {
  const { children, isError } = props;

  return (
    <p
      className={classNames({
        [style["ty-text"]]: true,
        [style["ty-text--error"]]: isError,
      })}
    >
      {children}
    </p>
  );
}
