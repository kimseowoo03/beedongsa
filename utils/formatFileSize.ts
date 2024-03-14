/**
 * 파일 크기를 받아서 MB 또는 KB 단위로 변환하여 반환합니다.
 * @param {number} fileSizeInBytes - 파일 크기 (바이트 단위)
 * @returns {string} - 변환된 파일 크기 문자열 (예: "2.55 MB" 또는 "40 KB")
 */
export function formatFileSize(fileSizeInBytes: number) {
  if (fileSizeInBytes >= 1024 * 1024) {
    return `${(fileSizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(fileSizeInBytes / 1024).toFixed(1)} KB`;
  }
}
