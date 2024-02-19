import { TokenType } from "@/types/auth";
import { HiOutlineXMark } from "react-icons/hi2";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Resizer from "react-image-file-resizer";
interface uploadFileProps {
  files: File[];
  token: NonNullable<TokenType>;
}

const resizeFile = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const outputFormat = file.type === "image/png" ? "PNG" : "JPEG";

    Resizer.imageFileResizer(
      file, // 파일 객체
      700, // 최대 너비
      700, // 최대 높이
      outputFormat, // 변환될 이미지 형식
      70, // 품질
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

const uploadFileFn = async ({ files, token }: uploadFileProps) => {
  const formData = new FormData();

  console.log("압축 전", files);

  for (const file of files) {
    try {
      const resizedImage = await resizeFile(file);
      console.log("압축후", resizedImage);
      formData.append("files", resizedImage);
    } catch (err) {
      console.error("Resize error:", err);
    }
  }

  const response = await fetch(`/api/setting/portfolio`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

interface UploadFileProps {
  token: NonNullable<TokenType>;
}
const UploadFile = ({ token }: UploadFileProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event) => {
    setFiles((prevFiles) => [...prevFiles, ...event.target.files]);
    console.log(files);
  };

  const mutation = useMutation({
    mutationFn: uploadFileFn,
  });

  const uploadFile = async () => {
    if (!files) {
      alert("파일을 선택해주세요.");
      return;
    }
    console.log(files[0], "file");
    mutation.mutate(
      {
        files,
        token,
      },
      {
        onSuccess: (response) => {
          alert(response.message);
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
