import { useCallback, useEffect} from "react";
import "../style/Tab.css";
import { useLocation, useNavigate } from "react-router";

export default function TabList() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabFlg = (pathname.replace("/", "") || "/list");

  useEffect(() => {
    if(pathname === '/') {
      navigate('/list');
    }
  }, [pathname, navigate])

  const tabChange = useCallback((flg: string) => {
    navigate(`/${flg}`);
  }, [navigate]);

  return (
    <div className="tab-container">
      <button
        className={`tab-button ${tabFlg === "list" && "active"}`}
        onClick={() => tabChange("list")}
      >
        List
      </button>
      <button
        className={`tab-button ${tabFlg === "register" && "active"}`}
        onClick={() => tabChange("register")}
      >
        등록
      </button>
      <button
        className={`tab-button ${tabFlg === "procedure" && "active"}`}
        onClick={() => tabChange("procedure")}
      >
        프로시저
      </button>
      <button
        className={`tab-button ${tabFlg === "batch" && "active"}`}
        onClick={() => tabChange("batch")}
      >
        배치
      </button>
      <button
        className={`tab-button ${tabFlg === "code" && "active"}`}
        onClick={() => tabChange("code")}
      >
        공통코드 등록
      </button>
      <button
        className={`tab-button ${tabFlg === "teamTree" && "active"}`}
        onClick={() => tabChange("teamTree")}
      >
        팀 트리
      </button>
      <button
        className={`tab-button ${tabFlg === "manageMap" && "active"}`}
        onClick={() => tabChange("manageMap")}
      >
        팀 감독 매핑
      </button>
    </div>
  );
}
