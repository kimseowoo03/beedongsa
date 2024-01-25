"use client";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

export default function HomePage() {
  const [{ email, idToken }] = useAtom(userAtom);
  // const [idToken, setIdToken] = useState("");

  console.log(idToken, "idTosken");
  const eventHandler = () => {
    if (!idToken) {
      alert("로그인한 유저만 사용할 수 있습니다.");
    }
  };
  return (
    <div>
      <h1>메인 페이지</h1>
      {idToken ? <p>{idToken}</p> : <p>로딩중</p>}
      <button onClick={eventHandler}>인증된 유저만 눌러라</button>
    </div>
  );
}
