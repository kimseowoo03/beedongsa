import { ProfileClient } from "@/components/Templates/ProfileClient";
import { ProfileEducator } from "@/components/Templates/ProfileEducator";

//TODO: 선택 유형에따라 보여주는 화면 다르게 작업
export default function ProfilePage() {
  return (
    <div>
      <ProfileEducator />
      <ProfileClient />
    </div>
  );
}
