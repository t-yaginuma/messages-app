import React from "react";
import Image from "next/image";
import styles from "@/components/TyCircleImage/TyCircleImage.module.scss";

type Props = {
  src: string;
  alt: string;
};

export default function TyInput(props: Props) {
  const { src, alt } = props;
  return (
    <div className={styles["ty-circle-image"]}>
      <Image
        className={styles["ty-circle-image__image"]}
        src={src}
        width={36}
        height={36}
        alt={alt}
      />
    </div>
  );
}
