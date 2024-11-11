export interface Cover {
  coverCode: number; // "Integer, AI 커버 코드"
  coverName: string; // "String, AI 커버 제목"
  storagePath: string; // "String, AI 커버 파일 경로"
  isPublic: boolean; // "Integer, 공개 여부"
  likeCount: number; // "Integer, 좋아요 수"
  profileImage: string;
  thumbnailPath: string; // "String, 썸네일 이미지 경로"
  nickname: string; // "String, 닉네임"
  coverSinger: string; // "String, 커버 가수명"
  singer: string; // "String, 원곡 가수명"
  title: string; // "String, 원곡명"
  isComplete: boolean;
  createdTime: string;
}

interface ModelInfo {
  userCode: number,
  modelCode: number, 
  modelName: string,
}

export interface CoverModelInterface {
  voiceModels: ModelInfo[];
}

export interface CoverCreateInterface {
  youtubeLink: string;
  singer: string;
  title: string;
  modelCode: string;
  pitch: number;
  coverName: string;
}


export interface CoverDetailInterface {
  coverName: string;
  coverDetail: string;
  storagePath: string;
  likeCount: number;
  profileImage: string;
  thumbnailPath: string;
  nickname: string;
  coverSinger: string;
  singer: string;
  title: string;
  isLiked: number;
  postTime: string;
}

export interface CoverResultInterface {
  coverCode: string;
  coverName: string;
  coverDetail: string;
  thumbnailPath: string;
  storagePath: string;
  coverSinger: string;
  singer: string;
  title: string;
  isPublic: boolean;
}

export interface SongInterface {
  coverSourceCode: number;
  singer: string; 
  title: string;
  youtubeLink: string;
  thumbnailPath: string; 
}