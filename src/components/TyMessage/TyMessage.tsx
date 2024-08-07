import React from "react";
import TyProfile from "@/components/TyProfile/TyProfile";
import dayjs from "dayjs";
import TyTextLink from "../TyTextLink/TyTextLink";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/_lib/firebase";

type Props = {
  profile_icon: string;
  date: string;
  user_name: string;
  text: string;
  id: string;
  isDeleteVisible: boolean;
  onDelete: (e: React.MouseEvent<HTMLAnchorElement>, postId: string) => {};
};

export default function TyMessage(props: Props) {
  const { id, user_name, date, profile_icon, text, isDeleteVisible, onDelete } =
    props;

  return (
    <article>
      <TyProfile image={profile_icon} name={user_name} />
      {text}
      <div>{dayjs(date).format("YYYY-MM-DD hh:mm")}</div>
      {isDeleteVisible && (
        <TyTextLink
          text="削除"
          href="#"
          onClick={(e) => {
            onDelete(e, id);
          }}
        ></TyTextLink>
      )}
    </article>
  );
}
