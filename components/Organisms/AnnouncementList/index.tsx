import { userAtom } from "@/atoms/auth";
import { TokenType } from "@/types/auth";
import type { ProfileDatasType } from "@/types/profile";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Link from "next/link";

const announcementClose = async ({
  id,
  token,
}: {
  id: string;
  token: NonNullable<TokenType>;
}): Promise<any> => {
  const response = await fetch("/api/announcement/close", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

interface AnnouncementListProps {
  ProfileData: ProfileDatasType;
}
const AnnouncementList = ({ ProfileData }: AnnouncementListProps) => {
  const [{ idToken }] = useAtom(userAtom);
  const { id, data } = ProfileData;

  const mutation = useMutation({
    mutationFn: announcementClose,
  });

  const announcementCloseHandler = () => {
    mutation.mutate(
      {
        id,
        token: idToken,
      },
      {
        onSuccess: (response) => {
          alert(response.message);
        },
      }
    );
  };

  return (
    <div>
      <div>
        {data.title}
        <Link href={`/profile/client/announcement-edit/${id}`}>수정</Link>

        <button
          type="button"
          onClick={announcementCloseHandler}
          disabled={data.closeAnnouncement}
        >
          {data.closeAnnouncement ? "공고 마감" : "공고 마감하기"}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementList;
