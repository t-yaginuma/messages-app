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

import { db, auth, storage } from "@/app/_lib/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Register() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [gender, setGender] = useState("1");
  const [isRead, setIsRead] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const usersRef = collection(db, "users");

  const submit = async () => {
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
        // ..
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
    console.log(image?.name);
  }, [image]);

  return (
    <>
      <TyHeading type="h1" label="ユーザー登録" />
      <div>
        <TyLabel label="ユーザー名">
          <TyInput
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="メールアドレス">
          <TyInput
            type="email"
            value={mailAddress}
            onChange={(e) => {
              setMailAddress(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="パスワード">
          <TyInput
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="プロフィールアイコン">
          <TyFileUpload
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
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </TyLabel>
        <TyLabel label="性別">
          <TyRadioGroup
            options={genderOptions}
            value={gender}
            onChange={(e) => {
              console.log(e);
              setGender(e.target.value);
            }}
          />
          {gender}
        </TyLabel>
        <TyLabel label="利用規約への同意">
          <Link
            href="https://google.com"
            target="_blank"
            onClick={() => {
              setIsRead(true);
            }}
          >
            利用規約を読む
          </Link>

          <TyCheckbox
            label="同意する"
            value={isAgreed}
            isDisabled={!isRead}
            onChange={(e) => {
              console.log(e);
              setIsAgreed(e.target.checked);
            }}
          ></TyCheckbox>
        </TyLabel>

        <TyButton
          label="キャンセル"
          onClick={() => {
            router.push("/login");
          }}
        />
        <TyButton label="登録" onClick={submit} isDisabled={!isAgreed} />
      </div>
    </>
  );
}
