import React from "react";
import styles from "@/components/TyMain/TyMain.module.scss";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  isContentCenter: boolean;
};

export default function TyMain(props: Props) {
  const { children, isContentCenter } = props;
  return (
    <main
      className={classNames(styles["ty-main"], {
        [styles["ty-main--center"]]: isContentCenter,
      })}
    >
      {children}
    </main>
  );
}
