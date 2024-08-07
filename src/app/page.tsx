"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import TyInput from "@/components/TyInput/TyInput";
import TyLabel from "@/components/TyLabel/TyLabel";
import TyHeading from "@/components/TyHeading/TyHeading";
import TyButton from "@/components/TyButton/TyButton";
import TyMessage from "@/components/TyMessage/TyMessage";
import TyDiv from "@/components/TyDiv/TyDiv";
import TyForm from "@/components/TyForm/TyForm";
import TyProfile from "@/components/TyProfile/TyProfile";
import TyText from "@/components/TyText/TyText";
import TyTextArea from "@/components/TyTextArea/TyTextArea";

import { db, auth, signOut } from "@/app/_lib/firebase";
import { useEffect } from "react";
import {
  doc,
  orderBy,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import dayjs from "dayjs";

type Me = {
  profile_icon: string;
  user_name: string;
  mail_address: string;
  gender: string;
  uid: string;
};

type Message = {
  id: string;
  profile_icon: string;
  user_name: string;
  message: string;
  date: string;
  userUid: string;
};

export default function Home() {
  const router = useRouter();

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [me, setMe] = useState<Me | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    console.log("fetching...");
    const q = query(collection(db, "messages"), orderBy("date"));
    const querySnapshot = await getDocs(q);

    const messagesArray: Message[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      messagesArray.push({ ...(doc.data() as Message), id: doc.id });
    });

    setMessages(messagesArray);
  };

  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const login = async () => {
          const uid = user.uid;
          const q = query(usersRef, where("uid", "==", uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setMe(doc.data() as Me);
          });

          setIsLoggedin(true);
        };

        login();
        fetchMessages();
      } else {
        router.push("/login");
      }
      unsubscribe();
    });
  }, []);

  const logout = () => {
    console.log("logout");
    signOut(auth);
    router.push("/login");
  };

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const message = (form.get("message") as string) || "";

    const messagesRef = collection(db, "messages");
    const add = await addDoc(messagesRef, {
      message: message,
      user_name: me?.user_name,
      profile_icon: me?.profile_icon,
      date: `${dayjs()}`,
      userUid: me?.uid,
    });
    console.log(add);
    await fetchMessages();
  };

  const deletePost = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    postId: string
  ) => {
    e.preventDefault();

    const collectionName = "messages";
    await deleteDoc(doc(db, collectionName, postId));

    await fetchMessages();
  };

  return (
    <>
      {isLoggedin && (
        <TyDiv>
          <TyHeading type="h1" label="メッセージアプリ" />

          <TyDiv>
            {!!messages.length &&
              messages.map((item) => {
                return (
                  <TyMessage
                    key={item.id}
                    id={item.id}
                    text={item.message}
                    profile_icon={item.profile_icon}
                    date={item.date}
                    user_name={item.user_name}
                    isDeleteVisible={item.userUid === me?.uid}
                    onDelete={deletePost}
                  />
                );
              })}

            {!messages.length && <TyText>メッセージはありません</TyText>}
          </TyDiv>

          <TyDiv>
            <TyForm onSubmit={submit}>
              {me?.profile_icon && (
                <TyProfile image={me.profile_icon} name={me.user_name} />
              )}
              <TyLabel label="メッセージ">
                <TyTextArea name="message" maxLength={140} />
              </TyLabel>
              <TyButton type="submit" label="登録" />
            </TyForm>
          </TyDiv>

          <TyDiv>
            <TyButton type="button" label="ログアウト" onClick={logout} />
          </TyDiv>
        </TyDiv>
      )}
    </>
  );
}
