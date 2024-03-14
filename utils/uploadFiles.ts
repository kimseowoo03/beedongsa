import { storage } from "@/app/firebaseConfig";
import Resizer from "react-image-file-resizer";
import { ref, uploadBytes } from "firebase/storage";

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

/**
 * 파일을 Firebase Storage에 업로드합니다. 이미지 파일(png, jpeg)은 사이즈 조절 후 업로드합니다.
 *
 * @param {File[]} attachments - 업로드할 파일 배열
 * @param {string} userID - 사용자 ID, 파일 경로 구성에 사용
 * @returns {Promise<string[]>} 업로드된 파일의 이름만 담긴 배열
 */
export async function uploadFiles(attachments: File[], userID: string) {
  try {
    const uploadPromises = attachments.map(async (file) => {
      const fileRef = ref(storage, `${userID}/${file.name}`);
      const metadata = { contentType: file.type };

      if (file.type === "image/png" || file.type === "image/jpeg") {
        const resizedImage = await resizeFile(file); // resizeFile은 사이즈를 조절하는 함수
        file = new File([resizedImage], file.name, {
          type: file.type,
        });
      }

      await uploadBytes(fileRef, file, metadata);

      return file.name;
    });

    const fileNames = await Promise.all(uploadPromises);
    return fileNames;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
}
