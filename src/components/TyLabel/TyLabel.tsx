import React from "react";
import styles from "@/components/TyLabel/TyLabel.module.scss";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function TyInput(props: Props) {
  const { label, children } = props;
  return (
    <label className={styles["ty-label"]}>
      <span className={styles["ty-label__label"]}>{label}</span>
      <div className={styles["ty-label__content"]}>{children}</div>
    </label>
  );
}
