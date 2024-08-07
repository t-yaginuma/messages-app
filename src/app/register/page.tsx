"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TyInput from "@/components/TyInput/TyInput";
import TyLabel from "@/components/TyLabel/TyLabel";
import TyHeading from "@/components/TyHeading/TyHeading";
import TyButton from "@/components/TyButton/TyButton";
import TyCheckbox from "@/components/TyCheckbox/TyCheckbox";
import TyFileUpload from "@/components/TyFileUpload/TyFileUpload";
import TyRadioGroup from "@/components/TyRadioGroup/TyRadioGroup";
import TyForm from "@/components/TyForm/TyForm";
import TyDiv from "@/components/TyDiv/TyDiv";
import TyText from "@/components/TyText/TyText";

import { db, auth, storage } from "@/app/_lib/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import TyTextLink from "@/components/TyTextLink/TyTextLink";
import dayjs from "dayjs";

export default function Register() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [isRead, setIsRead] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const userName = (form.get("user-name") as string) || "";
    const mailAddress = (form.get("mail-address") as string) || "";
    const password = (form.get("password") as string) || "";
    const gender = (form.get("gender") as string) || "";
    const birthday = (form.get("birthday") as string) || "";
    const imagePost = form.get("imagePost") || "";

    console.log(form);
    console.log(userName);
    console.log(mailAddress);
    console.log(password);
    console.log(gender);
    console.log(birthday);
    console.log(imagePost);

    createUserWithEmailAndPassword(auth, mailAddress, password)
      .then(async (userCredential) => {
        const uid = await userCredential.user.uid;
        return uid;
      })
      .then(async (uid) => {
        const storageRef = ref(storage, `circle-images/${image?.name}`);

        if (image) {
          const snapshot = await uploadBytes(storageRef, image);
          console.log("Uploaded a blob or file!", snapshot);
        }

        const imageUrl = await getDownloadURL(storageRef);
        return { uid, imageUrl };
      })
      .then((obj) => {
        const usersRef = collection(db, "users");
        addDoc(usersRef, {
          user_name: userName,
          mail_address: mailAddress,
          profile_icon: obj.imageUrl,
          birthday: birthday,
          gender: gender,
          uid: obj.uid,
        });
        router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/invalid-credential":
            setErrorMessage("メールアドレスか、パスワードが間違えています。");
            break;
        }
      });
  };

  const genderOptions = [
    {
      id: "1",
      label: "男",
    },
    {
      id: "2",
      label: "女",
    },
    {
      id: "3",
      label: "その他",
    },
  ];

  useEffect(() => {
    // console.log(image?.name);
  }, [image]);

  return (
    <>
      <TyHeading type="h1" label="ユーザー登録" />
      <TyForm onSubmit={submit}>
        <TyLabel label="ユーザー名">
          <TyInput type="text" name="user-name" placeholder="名前" isRequired />
        </TyLabel>
        <TyLabel label="メールアドレス">
          <TyInput
            type="email"
            name="mail-address"
            placeholder="メールアドレス"
            isRequired
          />
        </TyLabel>
        <TyLabel label="パスワード">
          <TyInput
            type="password"
            name="password"
            placeholder="パスワード"
            isRequired
          />
        </TyLabel>
        <TyLabel label="プロフィールアイコン">
          <TyFileUpload
            name="image"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </TyLabel>
        <TyLabel label="生年月日">
          <TyInput
            type="date"
            name="birthday"
            maxDate={`${dayjs(new Date()).format("YYYY-MM-DD")}`}
            isRequired
          />
        </TyLabel>
        <TyLabel label="性別">
          <TyRadioGroup
            options={genderOptions}
            name="gender"
            isRequired
            defaultValue="3"
          />
        </TyLabel>
        <TyLabel label="利用規約への同意">
          <TyDiv>
            <Link
              href="https://google.com"
              target="_blank"
              onClick={() => {
                setIsRead(true);
              }}
            >
              利用規約を読む
            </Link>
          </TyDiv>

          <TyCheckbox
            label="同意する"
            value={isAgreed}
            isDisabled={!isRead}
            onChange={(e) => {
              setIsAgreed(e.target.checked);
            }}
          ></TyCheckbox>
        </TyLabel>

        <TyButton type="submit" label="登録" isDisabled={!isAgreed} />
      </TyForm>
      {errorMessage && <TyText isError>{errorMessage}</TyText>}
      <TyDiv>
        <TyTextLink href="/login" text="ログイン画面へ戻る" />
      </TyDiv>
    </>
  );
}
