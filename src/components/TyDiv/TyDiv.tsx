import React from "react";
import style from "@/components/TyText/TyText.module.scss";
import classNames from "classnames";
import { isErrored } from "stream";

type Props = {
  children: React.ReactNode;
};

export default function TyDiv(props: Props) {
  const { children } = props;

  return (
    <p
      className={classNames({
        [style["ty-div"]]: true,
      })}
    >
      {children}
    </p>
  );
}
