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
import { auth } from "@/app/_lib/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <TyHeading type="h1" label="ログイン" />
      <TyForm>
        <TyLabel label="メールアドレス">
          <TyInput
            onChange={(e) => {
              setEmail(e.target.value);
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
      </TyForm>
      <TyButton label="ログイン" onClick={submit} />
    </>
  );
}
