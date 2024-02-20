import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Resizer from "react-image-file-resizer";

import { storage } from "@/app/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

import { HiOutlineXMark } from "react-icons/hi2";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { TokenType } from "@/types/auth";

const resizeFile = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const outputFormat = file.type === "image/png" ? "PNG" : "JPEG";

    Resizer.imageFileResizer(
      file, // 파일 객체
      600, // 최대 너비
      600, // 최대 높이
      outputFormat, // 변환될 이미지 형식
      60, // 품질
      0, // 회전
      (uri) => {
        // 'file' 타입으로 반환될 경우, Blob 형식으로 변환
        if (uri instanceof Blob) {
          // 이미 Blob이면 그대로 사용
          resolve(uri);
        }
      },
      "file" // 반환될 파일 형식 (base64, blob, file 중 선택)
    );
  });

interface uploadFileProps {
  files: File[];
  token: NonNullable<TokenType>;
  userID: string;
}
const uploadFileFn = async ({
  files,
  token,
  userID,
}: uploadFileProps): Promise<{ message: string; uploads: any[] }> => {
  let value: string[] = [];

  const uploadResults = await Promise.all(
    files.map(async (file) => {
      const fileRef = ref(storage, `${userID}/${file.name}`);
      const metadata = { contentType: file.type };

      if (file.type === "image/png" || file.type === "image/jpeg") {
        const resizedImage = await resizeFile(file);
        file = new File([resizedImage], file.name, {
          type: file.type,
        });
      }

      //1. storage에 업로드
      const uploadResult = await uploadBytes(fileRef, file, metadata);
      value.push(file.name);

      return uploadResult.metadata;
    })
  );

  // 모든 파일이 업로드되었음을 알리는 메시지와 함께 메타데이터 배열을 반환합니다.
  const response = await fetch("/api/user/portfolios", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userID, value }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }

  return {
    message: "All files have been uploaded successfully.",
    uploads: uploadResults,
  };
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const UploadFile = () => {
  const [{ userID, idToken: token }] = useAtom(userAtom);

  //파일 명
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 1) {
      // 파일이 여러 개인 경우에는 파일 크기를 검사하여 유효한 파일만 배열에 추가

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (file.size <= MAX_FILE_SIZE) {
          setFiles((prev) => [...prev, file]);
        } else {
          alert(`${file.name} 파일의 크기가 50MB를 초과하여 제외되었습니다.`);
        }
      }
    } else if (selectedFiles.length === 1) {
      // 파일이 한 개인 경우에는 바로 파일 크기를 검사하여 처리
      const file = selectedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} 파일의 크기가 50MB를 초과하여 제외되었습니다.`);
      } else {
        setFiles((prev) => [...prev, file]);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: uploadFileFn,
  });

  const uploadFile = async () => {
    if (!files.length) {
      alert("파일을 선택해주세요.");
      return;
    }

    mutation.mutate(
      {
        files,
        token,
        userID,
      },
      {
        onSuccess: (data) => {
          alert(data.message); // 성공 메시지 출력
        },
      }
    );
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={uploadFile}>업로드</button>

      <ul>
        {files.map((file) => {
          return (
            <li key={file.name}>
              {file.name}
              <HiOutlineXMark onClick={() => removeFile(file.name)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UploadFile;
