import React from "react";
import TyCircleImage from "@/components/TyCircleImage/TyCircleImage";
import styles from "@/components/TyProfile/TyProfile.module.scss";
import classNames from "classnames";
import { genders } from "@/Constants";
type Props = {
  image?: string;
  name?: string;
  mail?: string;
  gender?: string;
};

export default function TyInput(props: Props) {
  const { name, image, mail, gender } = props;
  return (
    <div className={styles["ty-profile"]}>
      {image && <TyCircleImage src={image} alt={name!} />}
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
        {gender && (
          <span className={styles["ty-profile__text"]}>
            {genders[gender as "0" | "1" | "2"]}
          </span>
        )}
      </div>
    </div>
  );
}
