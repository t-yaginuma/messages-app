import React from "react";
import styles from "@/components/TyStack/TyStack.module.scss";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  gap: "sm" | "md" | "lg";
};

export default function TyStack(props: Props) {
  const { children, gap } = props;
  return (
    <div
      className={classNames(styles["ty-stack"], {
        [styles["ty-stack--gap-y-sm"]]: gap === "sm",
        [styles["ty-stack--gap-y-md"]]: gap === "md",
        [styles["ty-stack--gap-y-lg"]]: gap === "lg",
      })}
    >
      {children}
    </div>
  );
}
