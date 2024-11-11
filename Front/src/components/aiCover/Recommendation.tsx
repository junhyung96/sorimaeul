import { useEffect, useState } from "react";
import { getMusicSources } from "../../utils/coverAPI";
import { SongInterface } from "./CoverInterface";

function Recommendation({ onSongSelect }: { onSongSelect: (song: SongInterface) => void }) {
  const [sources, setSources] = useState<SongInterface[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const sourceData = await getMusicSources();
        setSources(sourceData.coverSources);
      } catch (err) {
        console.error("노래 소스 목록을 가져오는데 실패했습니다.");
      }
    })();
  }, []);

  const handleSelect = (selectedSong: SongInterface) => {
    onSongSelect(selectedSong); // 상위 컴포넌트로 선택된 노래의 전체 정보 전달
  };

  return (
    <>
      <select onChange={(e) => {
        const selectedSource = sources.find(source => source.youtubeLink === e.target.value);
        if (selectedSource) {
          handleSelect(selectedSource);
        }
      }}>
        <option value="">노래 선택</option>
        {sources.map((source, index) => (
          <option key={index} value={source.youtubeLink}>
            {source.singer} - {source.title}
          </option>
        ))}
      </select>
    </>
  );
}

export default Recommendation;
