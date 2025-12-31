import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

interface TeamModalProps {
  open: boolean;
  league: string;
  onClose: () => void;
}

export default function TeamModal({ open, league, onClose }: TeamModalProps) {
  const [searchLeague, setSearchLeague] = useState("");
  const [leagueCd, setLeagueCd] = useState([]);
  // const [selectedLeague, setSelectedLeague] = useState("");
  const [searchTeamList, setSearchTeamList] = useState([]);
  const [searchTeam, setSearchTeam] = useState("");

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
    setSearchLeague(league);
  }, [open]);

  useEffect(() => {
    if (searchLeague !== "") {
      const getTeamList = async () => {
        try {
          const response = await axiosInstance("/api/getLeagueCd", {
            params: { codeId: searchLeague },
          });
          if (response.status === 200) {
            setSearchTeamList(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getTeamList();
    }else{
      setSearchTeam('');
      setSearchTeamList([]);
    }
  }, [searchLeague]);

  const onConfirm = () => {
    onClose(searchTeam, searchLeague);
  }

  return (
    <Modal
      title="팀 정보"
      open={open}
      onOk={onConfirm}
      onCancel={onClose}
      okText="확인"
      cancelText="취소"
    >
      <div className="soccer-form__group">
        <label className="soccer-form__label">리그</label>
        <select
          className="soccer-form__select"
          id="leagueSelectBox"
          value={searchLeague}
          onChange={(e) => setSearchLeague(e.target.value)}
        >
          <option value="">선택하세요</option>
          {leagueCd?.map((item) => (
            <option
              key={item.CODE_ID}
              value={item.CODE_ID}
              selected={searchLeague === item.CODE_ID}
            >
              {item.VALUE}
            </option>
          ))}
        </select>
      </div>

      <div className="soccer-form__group">
        <label className="soccer-form__label">팀 목록</label>
        <select
          className="soccer-form__select"
          id="teamSelectBox"
          value={searchTeam}
          onChange={(e) => setSearchTeam(e.target.value)}
        >
          <option value="">선택하세요</option>
          {searchTeamList?.map((item) => (
            <option key={item.CODE_ID} value={item.CODE_ID}>
              {item.VALUE}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
}
