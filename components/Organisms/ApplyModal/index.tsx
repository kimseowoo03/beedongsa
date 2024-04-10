import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import Button from "@/components/Atoms/Button";
import { CancelButton } from "@/components/Atoms/CancelButton";
import { MultipleSelection } from "@/components/Molecules/CheckboxLabel";

import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/atoms/auth";
import { applyValuesAtom, applyModalAtom } from "@/atoms/apply";

import styled from "@emotion/styled";
import { BackgroundModal, Buttons, ModalWrap } from "@/styles/Modal";
import { GoFile } from "react-icons/go";
import { HiOutlineXMark } from "react-icons/hi2";
import { Hr } from "@/styles/htmlStyles";

import {
  FileSelectBox,
  FileSizeBox,
  FilesBox,
} from "@/components/Molecules/UploadFile";

import type { TokenType } from "@/types/auth";
import type { Apply, ApplyWithID } from "@/types/apply";
import type { firestoreQueryDocumentResData } from "@/types/firebaseType";
import type { Lecture } from "@/types/lecture";
import type { UserType } from "@/types/user";

import { formatFileSize } from "@/utils/formatFileSize";
import { uploadFiles } from "@/utils/uploadFiles";

import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { useApplyQuery } from "@/hooks/[userID]/useApplyQuery";
import { transformFirestoreDocument } from "@/utils/transformFirebaseDocument";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 50MB

const Wrap = styled(ModalWrap)`
  width: 400px;
  height: 500px;
`;

interface createApplyProps {
  inquiriesData: Apply;
  token: NonNullable<TokenType>;
}
const createApply = async ({
  inquiriesData,
  token,
}: createApplyProps): Promise<any> => {
  const response = await fetch("/api/apply/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inquiriesData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

interface checkApplyProps {
  data: ApplyWithID;
  token: NonNullable<TokenType>;
}
const updateApply = async ({ data, token }: checkApplyProps): Promise<any> => {
  const response = await fetch("/api/apply/patch", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage);
  }
  return response.json();
};

// Firebase에서 파일 URL을 가져오는 함수
async function fetchFileURL(fileName, fileUserID) {
  const storage = getStorage();
  const fileRef = ref(storage, `/${fileUserID}/${fileName}`);
  return getDownloadURL(fileRef);
}

interface ApplyStepOneProps {
  ProfileDatas: firestoreQueryDocumentResData<Lecture>[];
}
const ApplyStepOne = ({ ProfileDatas }: ApplyStepOneProps) => {
  const [
    {
      idToken: token,
      email: educatorEmail,
      name: educatorName,
      userID: educatorID,
    },
  ] = useAtom(userAtom);

  const [isApplyModal, setIsApplyModal] = useAtom(applyModalAtom);
  const [applyValues, setApplyValues] = useAtom(applyValuesAtom);

  // 날짜와 시간을 문자열로 변환
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 연도
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 월
  const day = currentDate.getDate().toString().padStart(2, "0"); // 일
  const dateOfInquiry = `${year}-${month}-${day}`;

  const [attachments, setAttachments] = useState<File[]>([]);
  const [totalMaxFileSize, setTotalMaxFileSize] = useState(0);
  const [selection, setSelection] = useState<
    "registeredProfile" | "attachments"
  >("registeredProfile");

  const mutation = useMutation({
    mutationFn: createApply,
  });

  const ApplyHandler = async () => {
    let mutateData: createApplyProps;

    if (selection === "registeredProfile") {
      const filteredProfile = ProfileDatas.filter(
        (data) => data.id === applyValues.lectureID
      );

      const lectureTitle = filteredProfile[0].data.title;

      // 프로필 지원인 경우 , 파일첨부 키는 제거
      mutateData = {
        inquiriesData: {
          ...applyValues,
          educatorEmail,
          educatorID,
          educatorName,
          isApplicationStatus: true,
          applyType: "registeredProfile",
          attachedFileName: undefined,
          lectureTitle,
          dateOfInquiry,
        },
        token,
      };

      mutation.mutate(mutateData, {
        onSuccess: (response) => {
          alert(response.message);
          setIsApplyModal(() => false);
          setApplyValues(() => applyValues);
        },
      });
    } else {
      try {
        //1. 파일 업로드
        const fileNames = await uploadFiles(attachments, educatorID);

        // 파일첨부 지원인 경우 , 강의 ID 키는 제거
        mutateData = {
          inquiriesData: {
            ...applyValues,
            educatorEmail,
            educatorID,
            educatorName,
            isApplicationStatus: true,
            applyType: "attachments",
            lectureID: undefined,
            attachedFileName: fileNames,
            dateOfInquiry,
          },
          token,
        };

        //2. 파일 업로드 후 지원하기 데이터 생성
        mutation.mutate(mutateData, {
          onSuccess: (response) => {
            alert(response.message);
            setIsApplyModal(() => false);
            setApplyValues(() => applyValues);
          },
        });
      } catch (error) {
        alert("파일 지원에 실패하였습니다.");
      }
    }
  };

  const onChange = useCallback(
    (name: string, type: string, checked: boolean, newValue: string) => {
      setApplyValues((prevValues) => {
        return {
          ...prevValues,
          [name]: checked ? newValue : "",
        };
      });
    },
    [setApplyValues]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    const file = selectedFiles[0];

    const isDuplicateFile = attachments.some(
      (attachment) => attachment.name === file.name
    );

    if (isDuplicateFile) {
      alert("중복된 파일입니다.");
      return;
    }

    if (
      file.size > MAX_FILE_SIZE ||
      file.size + totalMaxFileSize > MAX_FILE_SIZE
    ) {
      alert(`${file.name} 파일의 크기가 5MB를 초과했습니다.`);
    } else {
      setAttachments((prev) => [...prev, file]);
      setTotalMaxFileSize((prev) => prev + file.size);
    }
  };

  const uploadRemoveFile = (fileName: string, fileSize: number) => {
    setAttachments(attachments.filter((file) => file.name !== fileName));
    setTotalMaxFileSize((prev) => prev - fileSize);
  };
  return (
    <>
      <h2>지원하기</h2>
      <label>
        <input
          type="radio"
          value="registeredProfile"
          checked={selection === "registeredProfile"}
          onChange={() => setSelection("registeredProfile")}
        />
        등록된 프로필 선택
      </label>
      <label>
        <input
          type="radio"
          value="attachments"
          checked={selection === "attachments"}
          onChange={() => setSelection("attachments")}
        />
        파일첨부
      </label>

      {selection === "registeredProfile" ? (
        <div>
          {ProfileDatas ? (
            <MultipleSelection values={applyValues.lectureID}>
              {ProfileDatas.map((lecture) => {
                return (
                  <MultipleSelection.CheckboxLabel
                    key={lecture.id}
                    label={lecture.data.title}
                    type="checkbox"
                    name="lectureID"
                    id={lecture.data.title}
                    value={lecture.id}
                    onChange={onChange}
                    checked={applyValues.lectureID === lecture.id}
                  />
                );
              })}
            </MultipleSelection>
          ) : (
            <p>등록된 프로필이 없습니다.</p>
          )}
        </div>
      ) : (
        <div>
          <p className="title">파일 첨부</p>
          <p className="explanation">
            첨부된 파일(PDF, PNG, JPG, JPEG, GIP)들은 총 5MB까지 가능합니다.
          </p>
          <FileSelectBox>
            <div className="selectedFile">
              <GoFile />
              {attachments.length > 0
                ? attachments[attachments.length - 1].name
                : "선택한 파일이 없습니다."}
            </div>
            <label htmlFor="file">
              <div className="fileSelectBox">파일 선택</div>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              accept=".pdf, .png, .jpg, .jpeg, .gif"
              autoComplete="off"
            />
          </FileSelectBox>
          <Hr />
          <FilesBox>
            {attachments.map((file) => {
              const size = formatFileSize(file.size);
              return (
                <li key={file.name}>
                  <div>
                    <GoFile />
                    <span>{file.name}</span>
                    <FileSizeBox>{size}</FileSizeBox>
                  </div>
                  <HiOutlineXMark
                    onClick={() => uploadRemoveFile(file.name, file.size)}
                  />
                </li>
              );
            })}
          </FilesBox>
          <p>{formatFileSize(totalMaxFileSize)}</p>
        </div>
      )}

      <Buttons>
        <CancelButton cancelHandler={() => setIsApplyModal(false)} />
        <Button type="button" text="지원하기" onClick={ApplyHandler} />
      </Buttons>
    </>
  );
};

interface ApplyStepTwoProps {
  applyModalClose: () => void;
}
const ApplyStepTwo = ({ applyModalClose }: ApplyStepTwoProps) => {
  const [{ idToken: token }] = useAtom(userAtom);

  const [applyValues, setApplyValues] = useAtom(applyValuesAtom);
  const { attachedFileName, applyType, lectureID, lectureTitle, educatorID } =
    applyValues;

  // 파일 다운로드 함수
  const downloadFile = async (fileName) => {
    try {
      const fileUrl = await fetchFileURL(fileName, educatorID);
      const response = await fetch(fileUrl);
      const blob = await response.blob(); // 파일의 Blob 가져오기

      const downloadUrl = window.URL.createObjectURL(blob); // Blob을 위한 로컬 URL 생성
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = downloadUrl;
      a.download = fileName; // 다운로드될 파일의 이름 설정
      document.body.appendChild(a);
      a.click(); // 링크 클릭

      window.URL.revokeObjectURL(downloadUrl); // 사용한 URL 해제
      document.body.removeChild(a); // 생성한 a 태그 제거
    } catch (error) {
      alert("파일을 다운로드하는 데 실패했습니다.");
    }
  };

  // 전체 파일 다운로드 함수
  const downloadAllFiles = async () => {
    for (let fileInfo of attachedFileName) {
      const [name] = fileInfo.split("/");
      await downloadFile(name); // 파일 이름을 이용하여 다운로드
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 각 파일 다운로드 사이에 딜레이
    }
  };

  const mutation = useMutation({
    mutationFn: updateApply,
  });

  const applyCheckHandler = () => {
    const isConfirmed = window.confirm("최종매칭을 수락하겠습니까?");

    if (isConfirmed) {
      mutation.mutate(
        {
          data: {
            ...applyValues,
            isApplicationConfirmationStatus: true,
          },
          token,
        },
        {
          onSuccess: async (response) => {
            alert(response.message);
            setApplyValues(() => response.data);
          },
        }
      );
    }
  };

  return (
    <>
      <h2>지원확인</h2>
      <div>
        {applyType === "registeredProfile" ? (
          <>
            <p>지원한 프로필 확인</p>
            <Link href={`/lectures/${lectureID}`}>{lectureTitle}</Link>
          </>
        ) : (
          <>
            <p>지원한 첨부파일</p>
            <FilesBox>
              {attachedFileName.map((fileInfo) => {
                const [name] = fileInfo.split("/");
                return (
                  <li key={name}>
                    <div>
                      <GoFile />
                      <span>{name}</span>
                      <button onClick={() => downloadFile(name)}>
                        다운로드
                      </button>
                    </div>
                  </li>
                );
              })}
            </FilesBox>

            <button onClick={downloadAllFiles}>전체다운로드</button>
          </>
        )}

        <p>최종 매칭되면 연락처 확인이 가능합니다.</p>
        <p>최종 매칭은 1명만 가능하니 신중하게 결정해주세요.</p>
      </div>

      <Buttons>
        <CancelButton cancelHandler={applyModalClose} />
        <Button type="button" text="최종매칭" onClick={applyCheckHandler} />
      </Buttons>
    </>
  );
};

interface ApplyStepThreeProps {
  applyInitialValues: ApplyWithID;
  token: TokenType;
  applyModalClose: () => void;
  userType: UserType;
}
const ApplyStepThree = ({
  applyInitialValues,
  token,
  applyModalClose,
  userType,
}: ApplyStepThreeProps) => {
  const { isFinalMatchedStatus } = applyInitialValues;

  const [_applyValues, setApplyValues] = useAtom(applyValuesAtom);

  const mutation = useMutation({
    mutationFn: updateApply,
  });

  const matchCofirmationHandler = () => {
    mutation.mutate(
      {
        data: {
          ...applyInitialValues,
          isFinalMatchedStatus: true,
        },
        token,
      },
      {
        onSuccess: (response) => {
          setApplyValues(() => response.data);
        },
      }
    );
  };

  return (
    <>
      <h2>최종매칭</h2>
      {!isFinalMatchedStatus && (
        <div>
          <p>
            클라이언트의 지원 검토가 완료되었습니다. 최종 매칭을 선택하시면
            클라이언트와의 매칭이 확정됩니다. 매칭이 확정되면, 관련 담당자의
            연락처 정보를 확인하실 수 있습니다.
          </p>

          <Buttons>
            <CancelButton cancelHandler={applyModalClose} />
            <Button
              type="button"
              text="확인"
              onClick={matchCofirmationHandler}
            />
          </Buttons>
        </div>
      )}

      {isFinalMatchedStatus && (
        <ul>
          {userType === "client" ? (
            <>
              <li>
                <span>담당자명:</span>
                <span>{applyInitialValues.managerName}</span>
              </li>
              <li>
                <span>담당자 이메일:</span>
                <span>{applyInitialValues.managerEmail}</span>
              </li>
              <li>
                <span>담당자 전화번호:</span>
                <span>{applyInitialValues.managerPhoneNumber}</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <span>강사명:</span>
                <span>{applyInitialValues.educatorName}</span>
              </li>
              <li>
                <span>강사 이메일:</span>
                <span>{applyInitialValues.educatorEmail}</span>
              </li>
              <li>
                <span>강사 전화번호:</span>
                <span>{applyInitialValues.educatorPhoneNumber}</span>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
};

interface ApplyStatusModalProps {
  applyInitialValues: ApplyWithID;
  applyModalClose: () => void;
}
const ApplyStatusModal = ({
  applyInitialValues,
  applyModalClose,
}: ApplyStatusModalProps) => {
  const {
    isApplicationStatus,
    isApplicationConfirmationStatus,
    isFinalMatchedStatus,
  } = applyInitialValues;

  return (
    <>
      <Wrap>
        <p>지원하기 : {isApplicationStatus ? "O" : "X"}</p>
        <p>지원확인 : {isApplicationConfirmationStatus ? "O" : "X"}</p>
        <p>최종매칭 : {isFinalMatchedStatus ? "O" : "X"}</p>
        <button type="button" onClick={applyModalClose}>
          확인
        </button>
      </Wrap>
      <BackgroundModal />
    </>
  );
};

interface ApplyModalProps {
  ProfileDatas: firestoreQueryDocumentResData<Lecture>[];
}
export const ApplyModal = ({ ProfileDatas }: ApplyModalProps) => {
  const [{ type, idToken }] = useAtom(userAtom);

  const [applyValues, _setApplyValues] = useAtom(applyValuesAtom);

  const [isApplyModal, setIsApplyModal] = useAtom(applyModalAtom);
  const applyModalClose = () => setIsApplyModal(() => false);

  if (!isApplyModal) {
    return;
  }

  const { isApplicationStatus, isApplicationConfirmationStatus } = applyValues;

  return (
    <>
      <Wrap>
        {type === "client" ? (
          <>
            {/** 1단계 - 지원하기 (지원하기 단계는 강사만 해당됩니다.)   */}
            {/** 2단계 - 지원확인  */}
            {isApplicationStatus && !isApplicationConfirmationStatus ? (
              <ApplyStepTwo applyModalClose={applyModalClose} />
            ) : (
              <ApplyStatusModal
                applyInitialValues={applyValues}
                applyModalClose={applyModalClose}
              />
            )}
          </>
        ) : (
          <>
            {/** 1단계 - 지원하기  */}
            {!isApplicationStatus && (
              <ApplyStepOne ProfileDatas={ProfileDatas} />
            )}

            {/** 2단계 - 지원 대기 (클라이언트 확인이 안된 상태) */}
            {isApplicationStatus && !isApplicationConfirmationStatus && (
              <ApplyStatusModal
                applyInitialValues={applyValues}
                applyModalClose={applyModalClose}
              />
            )}
          </>
        )}

        {/** 3단계 - 최종 매칭  */}
        {isApplicationConfirmationStatus && (
          <ApplyStepThree
            applyInitialValues={applyValues}
            token={idToken}
            applyModalClose={applyModalClose}
            userType={type}
          />
        )}
      </Wrap>
      <BackgroundModal />
    </>
  );
};
