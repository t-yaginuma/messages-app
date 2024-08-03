"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

import TyInput from "@/components/TyInput/TyInput";
import TyLabel from "@/components/TyLabel/TyLabel";
import TyHeading from "@/components/TyHeading/TyHeading";
import TyButton from "@/components/TyButton/TyButton";
import TyCheckbox from "@/components/TyCheckbox/TyCheckbox";
import TyFileUpload from "@/components/TyFileUpload/TyFileUpload";
import TyForm from "@/components/TyForm/TyForm";

import { db } from "@/app/_lib/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const usersRef = collection(db, "users");

  const submit = async () => {
    console.log("hit");

    await addDoc(usersRef, {
      user_name: userName,
      mail_address: mailAddress,
      password: password,
      profile_icon: false,
      birthday: birthday,
      gender: "M",
    });
  };

  return (
    <>
      <TyHeading type="h1" label="ユーザー登録" />
      <TyForm>
        <TyLabel label="ユーザー名">
          <TyInput
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="メールアドレス">
          <TyInput
            onChange={(e) => {
              setMailAddress(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="パスワード">
          <TyInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="プロフィールアイコン">
          <TyFileUpload />
        </TyLabel>
        <TyLabel label="生年月日">
          <TyInput
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="性別">ラジオンボタン</TyLabel>
        <TyLabel label="利用規約への同意">
          <Link href="https://www.notion.so/a714620bbd8740d1ac98f2326fbd0bbc?pvs=21">
            利用規約を読む
          </Link>

          <TyCheckbox label="同意する"></TyCheckbox>
        </TyLabel>

        <TyButton label="キャンセル" />
      </TyForm>
      <TyButton label="登録" onClick={submit} />
    </>
  );
}
