import React from "react";
import TyCircleImage from "@/components/TyCircleImage/TyCircleImage";
import styles from "@/components/TyProfile/TyProfile.module.scss";
import classNames from "classnames";

type Props = {
  src?: string;
  name?: string;
  mail?: string;
  gender?: string;
};

export default function TyInput(props: Props) {
  const { name, src, mail, gender } = props;
  return (
    <div className={styles["ty-profile"]}>
      {src && <TyCircleImage src={src} alt={name!} />}

      <div>
        {name && (
          <span
            className={classNames(
              styles["ty-profile__text"],
              styles["ty-profile__text-name"]
            )}
          >
            {name}
          </span>
        )}
        {mail && <span className={styles["ty-profile__text"]}>{mail}</span>}
        {gender && <span className={styles["ty-profile__text"]}>{gender}</span>}
      </div>
    </div>
  );
}
