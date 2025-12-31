import { Checkbox, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import TeamModal from "./TeamModal";
import ManageModal from "./ManageModal";
import { useNavigate } from "react-router";

export default function ManageMap() {
  const navigate = useNavigate();
  const [teamChk, setTeamChk] = useState(false);
  const [leagueCd, setLeagueCd] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [manageInfo, setManageInfo] = useState({});
  const [leagueInitFlg, setLeagueInitFlg] = useState(false);
  // const [league, setLeague] = useState([]);

  useEffect(() => {
    const getLeagueCd = async () => {
      try {
        const response = await axiosInstance.get("/api/getLeagueCd", {
          params: { codeId: "LEAGUE" },
        });
        if (response.status === 200) {
          setLeagueCd(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLeagueCd();
  }, []);

  const handleModalClose = (team: string, league: string) => {
    if (team !== "") setTeamName(team);
    if (league !== "") setSelectedLeague(league);
    setLeagueInitFlg(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!leagueInitFlg) return;
    setTeamName("");
  }, [selectedLeague]);

  useEffect(() => {
    setTeamName("");
    setSelectedLeague("");
    setManageInfo({});
  }, [teamChk]);

  const handleManageModalClose = ({
    managerId,
    managerName,
  }: {
    managerId: string;
    managerName: string;
  }) => {
    setIsManageModalOpen(false);
    setManageInfo({ managerId, managerName });
  };

  const leagueInfo = (e) => {
    setSelectedLeague(e.target.value);
    setLeagueInitFlg(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      team: teamName,
      league: selectedLeague,
      managerId: manageInfo.managerId
    };
    try {
      const res = await axiosInstance.post("/api/insertManageInfo", params);
      if (res.status === 200) {
        // alert("정상적으로 저장되었습니다.");
        // navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="soccer-form"
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        className="soccer-form__title"
        style={{ textAlign: "center", marginBottom: 30 }}
      >
        팀 내용 등록
      </h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
        onSubmit={handleSubmit}
      >
        <Checkbox value={teamChk} onChange={() => setTeamChk(!teamChk)}>
          기존 팀 존재
        </Checkbox>

        <div
          className="soccer-form__group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="soccer-form__label" style={{ marginBottom: 6 }}>
            리그
          </label>
          <select
            className="soccer-form__select"
            id="leagueSelectBox"
            style={{ padding: 8, borderRadius: 4, border: "1px solid #d9d9d9" }}
            onChange={leagueInfo}
          >
            <option value="">선택하세요</option>
            {leagueCd &&
              leagueCd.map((item) => (
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

        <div
          className="soccer-form__group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="soccer-form__label" style={{ marginBottom: 6 }}>
            팀명
          </label>
          <Input
            type="text"
            className="soccer-form__input"
            style={{ padding: 8, borderRadius: 4, border: "1px solid #d9d9d9" }}
            disabled={teamChk}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            suffix={
              <Button
                type="text"
                icon={<SearchOutlined />}
                style={{ padding: 0 }}
                onClick={() => setIsModalOpen(true)}
                disabled={!teamChk}
              />
            }
          />
        </div>
        <TeamModal
          open={isModalOpen}
          onClose={handleModalClose}
          league={selectedLeague}
        />

        <div
          className="soccer-form__group"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label className="soccer-form__label" style={{ marginBottom: 6 }}>
            감독
          </label>
          <Input
            placeholder="감독 검색"
            disabled={true}
            value={manageInfo.managerName}
            suffix={
              <Button
                type="text"
                icon={<SearchOutlined />}
                style={{ padding: 0 }}
                onClick={() => setIsManageModalOpen(true)}
              />
            }
          />
          <ManageModal
            open={isManageModalOpen}
            onClose={handleManageModalClose}
            width={1000}
          />
        </div>
        <div className="soccer-form__actions">
          <button className="soccer-form__btn soccer-form__btn--cancel">
            취소
          </button>
          <button className="soccer-form__btn soccer-form__btn--submit">
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
