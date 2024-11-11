import { useEffect, useState } from "react";
import { getMyVoiceModels } from "../../../utils/voiceModelAPI";
import MenuDescription from "../MenuDescription";
import ModelCard from "./ModelCard";
import styled from "styled-components";
import Pagination from "../../common/Pagination";

const CardList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem auto;

  & > div:last-child {
    margin-right: auto;
  }
`

export interface ModelData {
  modelCode: number;
  modelName: string;
  imagePath: string;
  state: number;
  recordCount: number;
}

function ModelList() {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modelList, setModelList] = useState<ModelData[]>([]);

  const getModelList = async () => {
    const res = await getMyVoiceModels(page);
    setModelList(res.voiceModels);
    setTotalPages(res.totalPages);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getModelList();
  }, [page])

  return (
    <>
      <MenuDescription bigText={"나"} middleText={"의 음성 모델"} smallText={""} />
      {
        modelList &&
        <>
          <CardList>
            {
              modelList.map((el) => (
                <ModelCard key={el.modelCode} data={el} setModelList={setModelList} />
              ))
            }
          </CardList>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} color="#C9F647" />
        </>
      }
    </>
  )
}

export default ModelList;