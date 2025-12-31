import { useEffect, useState } from "react";
import "../style/SoccerRegister.css";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router";

export default function Register() {
  const [leagueCd, setLeagueCd] = useState([]);
  const [league, setLeague] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response;
      if (!id) {
        response = await axiosInstance.post("/api/regSoccer", {
          author: author,
          content: content,
          team: selectedTeam,
          league: selectedLeague,
        });
      } else {
        response = await axiosInstance.post("/api/updSoccerTeam", {
          author: author,
          content: content,
          team: selectedTeam,
          league: selectedLeague,
          postId: id,
        });
      }
      if (response.status === 200) {
        alert("성공적으로 저장되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      const getSoccerTeamDet = async () => {
        const response = await axiosInstance.get(`/api/getSoccerTeamDet/${id}`);
        if (response.status === 200) {
          setAuthor(response.data.author);
          setSelectedLeague(response.data.league);
          setSelectedTeam(response.data.team);
          setContent(response.data.content);
        }
      };
      getSoccerTeamDet();
    }
  }, []);

  useEffect(() => {
    const getLeagueCd = async () => {
      try {
        const response = await axiosInstance.get("/api/getLeagueCd", {
          params: { codeId: "LEAGUE" },
        });
        setLeagueCd(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getLeagueCd();
  }, []);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axiosInstance.get("/api/getLeagueCd", {
          params: { codeId: selectedLeague },
        });
        if (response.status === 200) {
          setLeague(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, [selectedLeague]);

  const handleOption = (e) => {
    setSelectedTeam(e.target.value);
  };

  const goList = () => {
    navigate("/list");
  };

  return (
    <div className="soccer-form">
      <h2 className="soccer-form__title">팀 내용 등록</h2>

      <form onSubmit={submithandler}>
        {/* 작성자 */}
        <div className="soccer-form__group">
          <label className="soccer-form__label">작성자</label>
          <input
            type="text"
            className="soccer-form__input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* 리그 */}
        <div className="soccer-form__group">
          <label className="soccer-form__label">리그</label>
          <select
            className="soccer-form__select"
            id="leagueSelectBox"
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            <option value="">선택하세요</option>
            {leagueCd.map((item) => (
              <option
                key={item.CODE_ID}
                value={item.CODE_ID}
                selected={selectedLeague === item.CODE_ID}
              >
                {item.VALUE}
              </option>
            ))}
          </select>
        </div>

        {/* 팀 */}
        <div className="soccer-form__group">
          <label className="soccer-form__label">팀</label>
          {selectedLeague ?
          (
            <div className="soccer-form__radio-group">
              {league &&
                league.map((item, i) => (
                  <label className="soccer-form__radio" key={i}>
                    <input
                      type="radio"
                      name="team"
                      value={item.VALUE}
                      onChange={handleOption}
                      checked={selectedTeam === item.VALUE}
                    />
                    {item.VALUE}
                  </label>
                ))}
            </div>
          ) : <div>팀을 선택하세요</div>}
        </div>

        {/* 내용 */}
        <div className="soccer-form__group">
          <label className="soccer-form__label">내용</label>
          <textarea
            className="soccer-form__textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 버튼 */}
        <div className="soccer-form__actions">
          <button
            className="soccer-form__btn soccer-form__btn--cancel"
            onClick={goList}
          >
            취소
          </button>
          <button className="soccer-form__btn soccer-form__btn--submit">
            {!id ? "등록" : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
}
