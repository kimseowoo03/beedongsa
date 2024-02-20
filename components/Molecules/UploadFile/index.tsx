import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Resizer from "react-image-file-resizer";

import { storage } from "@/app/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

import { HiOutlineXMark } from "react-icons/hi2";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

interface uploadFileProps {
  files: File[];
  userID: string;
}

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

const uploadFileFn = async ({
  files,
  userID,
}: uploadFileProps): Promise<{ message: string; uploads: any[] }> => {
  console.log("실행됨");

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

      const uploadResult = await uploadBytes(fileRef, file, metadata);
      console.log(
        `${file.type} file uploaded successfully`,
        uploadResult.metadata
      );

      return uploadResult.metadata;
    })
  );

  // 모든 파일이 업로드되었음을 알리는 메시지와 함께 메타데이터 배열을 반환합니다.
  return {
    message: "All files have been uploaded successfully.",
    uploads: uploadResults,
  };
};

const UploadFile = () => {
  const [{ userID }] = useAtom(userAtom);

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event) => {
    setFiles((prevFiles) => [...prevFiles, ...event.target.files]);
    console.log(files);
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
