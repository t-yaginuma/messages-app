import React from "react";
import style from "@/components/TyDiv/TyDiv.module.scss";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
};

export default function TyDiv(props: Props) {
  const { children } = props;

  return (
    <div
      className={classNames({
        [style["ty-div"]]: true,
      })}
    >
      {children}
    </div>
  );
}
