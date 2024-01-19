"use client";
import { useAtom } from "jotai";
import { idTokenAtom } from "@/atoms/auth/idTokenAtom";

export default function HomePage() {
  const [idTosken, setIdTosken] = useAtom(idTokenAtom);
  // const [idToken, setIdToken] = useState("");

  console.log(idTosken, "idTosken");
  const eventHandler = () => {
    if (!idTosken) {
      alert("로그인한 유저만 사용할 수 있습니다.");
    }
  };
  return (
    <div>
      <h1>메인 페이지</h1>
      {idTosken ? <p>{idTosken}</p> : <p>로딩중</p>}
      <button onClick={eventHandler}>인증된 유저만 눌러라</button>
    </div>
  );
}
