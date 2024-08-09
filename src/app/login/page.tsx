"use client";

import React, { useState, FormEventHandler } from "react";
import TyInput from "@/components/TyInput/TyInput";
import TyLabel from "@/components/TyLabel/TyLabel";
import TyHeading from "@/components/TyHeading/TyHeading";
import TyButton from "@/components/TyButton/TyButton";
import TyForm from "@/components/TyForm/TyForm";
import TyText from "@/components/TyText/TyText";
import TyTextLink from "@/components/TyTextLink/TyTextLink";
import TyDiv from "@/components/TyDiv/TyDiv";
import TyCard from "@/components/TyCard/TyCard";
import TyStack from "@/components/TyStack/TyStack";
import { auth } from "@/app/_lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import TyMain from "@/components/TyMain/TyMain";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = (form.get("email") as string) || "";
    const password = (form.get("password") as string) || "";

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        router.push("/");
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

  return (
    <>
      <TyMain isContentCenter>
        {" "}
        <TyCard>
          <TyStack gap="lg">
            <TyHeading type="h1" label="ログイン" />
            <TyForm onSubmit={submit}>
              <TyStack gap="md">
                <TyLabel label="メールアドレス">
                  <TyInput
                    type="email"
                    name="email"
                    isRequired
                    isError={!!errorMessage}
                  />
                </TyLabel>
                <TyLabel label="パスワード">
                  <TyInput
                    type="password"
                    name="password"
                    isRequired
                    isError={!!errorMessage}
                  />
                </TyLabel>
                {errorMessage && <TyText isError>{errorMessage}</TyText>}
                <TyButton type="submit" label="ログイン" />
              </TyStack>
            </TyForm>
            <TyDiv>
              <TyTextLink href="/register" text="新規登録する" />
            </TyDiv>
          </TyStack>
        </TyCard>
      </TyMain>
    </>
  );
}
