import React from "react";
import styles from "@/components/TyHeading/TyHeading.module.scss";
import classNames from "classnames";

type Props = {
  type: "h1" | "h2" | "h3";
  label: string;
};

export default function TyHeading(props: Props) {
  const { type, label } = props;
  const contents = {
    h1: (
      <h1
        className={classNames(styles["ty-heading"], styles["ty-heading--h1"])}
      >
        {label}
      </h1>
    ),
    h2: (
      <h2
        className={classNames(styles["ty-heading"], styles["ty-heading--h2"])}
      >
        {label}
      </h2>
    ),
    h3: (
      <h3
        className={classNames(styles["ty-heading"], styles["ty-heading--h3"])}
      >
        {label}
      </h3>
    ),
  };

  return contents[type];
}
