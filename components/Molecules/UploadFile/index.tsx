import { TokenType } from "@/types/auth";
import { HiOutlineXMark } from "react-icons/hi2";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface uploadFileProps {
  files: File[];
  token: NonNullable<TokenType>;
}
const uploadFileFn = async ({ files, token }: uploadFileProps) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
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
