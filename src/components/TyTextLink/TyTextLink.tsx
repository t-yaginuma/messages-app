import React from "react";
import styles from "@/components/TyTextLink/TyTextLink.module.scss";
import Link from "next/link";
import classNames from "classnames";

type Props = {
  text: string;
  href: string;
  isExternal?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function TyTextLink(props: Props) {
  const { text, href, isExternal, onClick } = props;

  return (
    <Link
      className={classNames(styles["ty-text-link"])}
      href={href}
      target={isExternal ? "_blank" : "_self"}
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
