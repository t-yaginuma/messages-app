import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

import TyInput from "@/components/TyInput/TyInput";
import TyLabel from "@/components/TyLabel/TyLabel";
import TyHeading from "@/components/TyHeading/TyHeading";
import TyFileUpload from "@/components/TyFileUpload/TyFileUpload";
import TyButton from "@/components/TyButton/TyButton";
import TyCheckbox from "@/components/TyCheckbox/TyCheckbox";
import TyForm from "@/components/TyForm/TyForm";
import TyMessage from "@/components/TyMessage/TyMessage";
import TyCircleImage from "@/components/TyCircleImage/TyCircleImage";
import TyProfile from "@/components/TyProfile/TyProfile";
import { db } from "@/app/_lib/firebase";
import { useEffect } from "react";
import TyPopper from "@/components/TyPopper/TyPopper";
// import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

export default function Home() {
  const text = async () => {
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // text();

  return (
    <>
      <div>
        ログアウト
        <div>
          <div>{/* <TyCircleImage /> */}</div>
          <span>Toru Yaginuma</span>
        </div>
      </div>
      <TyPopper />
      <TyHeading type="h1" label="メッセージアプリ" />
      <div>
        <TyProfile
          src="https://placehold.jp/32x32.png"
          name="Toru Yaginuma"
          mail="toru45s@gmail.com"
          gender="M"
        />
        <TyMessage text="ホゲホゲ" />
        <TyMessage text="ホゲホゲ" />
        <TyMessage text="ホゲホゲ" />
        <TyMessage text="ホゲホゲ" />
      </div>
      <TyForm>
        <TyLabel label="メッセージ">
          <TyInput />
        </TyLabel>
        <TyButton label="登録" />
      </TyForm>
    </>
  );
}
