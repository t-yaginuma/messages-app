import React from "react";
import styles from "@/components/TyCard/TyCard.module.scss";

type Props = {
  children: React.ReactNode;
};

export default function TyCard(props: Props) {
  const { children } = props;
  return <div className={styles["ty-card"]}>{children}</div>;
}
