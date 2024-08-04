"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { db, auth, signOut } from "@/app/_lib/firebase";
import { useEffect } from "react";
import TyPopper from "@/components/TyPopper/TyPopper";
// import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useCheckLogin from "@/hooks/useCheckLogin";
// Create a reference to the cities collection
import { collection, query, where, addDoc } from "firebase/firestore";

export default function Home() {
  const router = useRouter();

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [me, setMe] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string; uid: string }[]>(
    []
  );

  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;

        const q1 = query(usersRef, where("uid", "==", uid));
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          console.log(doc.data());
          setMe(doc.data());
        });

        const q2 = query(collection(db, "messages"));

        const querySnapshot2 = await getDocs(q2);
        function get() {
          const test = [];
          querySnapshot2.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            test.push(doc.data());
          });

          return test;
        }
        setMessages(get());
        setIsLoggedin(true);
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

  const submit = async () => {
    console.log("submit");
    const messagesRef = collection(db, "messages");
    const add = await addDoc(messagesRef, {
      message: message,
      user_uid: me.uid,
    });
    console.log(add);
  };

  return (
    <>
      {isLoggedin && (
        <>
          <TyHeading type="h1" label="メッセージアプリ" />
          <div>
            {messages &&
              messages.map((message) => {
                return (
                  <TyMessage text={message.message} key={message.message} />
                );
              })}

            {!messages && <p>メッセージはありません</p>}
          </div>
          <div>
            <div>
              <TyLabel label="メッセージ">
                <TyInput
                  type="text"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </TyLabel>
              <TyButton label="登録" onClick={submit} />
            </div>

            <div>
              {me.profile_icon && (
                <TyProfile
                  src={me.profile_icon}
                  name={me.user_name}
                  mail={me.mail_address}
                  gender={me.gender}
                />
              )}
              <TyButton label="ログアウト" onClick={logout} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
