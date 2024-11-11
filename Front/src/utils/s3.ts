import Resizer from "react-image-file-resizer";
import API from "./axios";
import axios from "axios";

export const s3URL = import.meta.env.VITE_S3_URL;
export const defaultCover = s3URL+"/image/coverImg.jpg";
export const defaultModel = s3URL+"/image/modelImg.jpg";

export const resizeFile = async (file: File) =>
  new Promise<File>((res) => {
    Resizer.imageFileResizer(
      file, // target file
      500, // maxWidth
      500, // maxHeight
      "JPEG", // compressFormat : Can be either JPEG, PNG or WEBP.
      80, // quality : 0 and 100. Used for the JPEG compression
      0, // rotation
      (uri) => res(uri as File), // responseUriFunc
      "file" // outputType : Can be either base64, blob or file.(Default type is base64)
    );
  });

const getPresignedURL = async (fileName: string, mimeType: string, fileSize: number) => {
  const URL = "/s3/upload";
  const response = await API.get(URL, {
    method: "GET",
    params: { 
      fileName,
      mimeType,
      fileSize
     },
  });
  return response.data.url as string;
};

const getFileName = (nickname: string) => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const YYMMDD = year + month + day;
  const randomNumber = Math.ceil(Math.random() * 10000);

  return YYMMDD + nickname + randomNumber + ".jpeg";
};


interface RequestS3 {
  filename: string;
  file: File;
}

export const requestS3 = async ({ filename, file }: RequestS3) => {
  const fileName = getFileName(filename);
  const [uploadURLResult, resizedFileResult] = await Promise.allSettled([
    getPresignedURL(fileName, file.type, file.size),
    resizeFile(file),
  ]);

  if (
    uploadURLResult.status === "fulfilled" &&
    resizedFileResult.status === "fulfilled"
  ) {
    axios.put(uploadURLResult.value, resizedFileResult.value, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return `/image/${fileName}`;
  } else {
    const error = new Error();
    error.name = "이미지 처리중 에러가 발생하였습니다.";
    error.message =
      uploadURLResult.status === "rejected"
        ? "업로드 요청 실패"
        : "올바르지 않은 파일";
    throw error;
  }
};
