export const useRefreshToken = () => {
  const refresh = async () => {
    //TODO:서버에 refreshToken을 사용한 요청 보내기
    const response = await fetch("/api/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage);
    }

    const data = await response.json();
    console.log(data, "useRefreshToken발급완료");
    return data;
  };

  return { refresh };
};
