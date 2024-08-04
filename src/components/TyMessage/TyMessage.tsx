import React from "react";
import TyProfile from "@/components/TyProfile/TyProfile";
import dayjs from "dayjs";

type Props = {
  text: string;
};

export default function TyMessage(props: Props) {
  const { text } = props;
  return (
    <article>
      <TyProfile src="https://placehold.jp/32x32.png" name="Toru Yaginuma" />
      {text}
      <div>{dayjs().format("YYYY-MM-DD hh:mm")}</div>
    </article>
  );
}
