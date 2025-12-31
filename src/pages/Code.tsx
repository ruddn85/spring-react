import { useCallback, useState, type FormEventHandler } from "react";
import "../style/Code.css";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router";

export default function Code() {
  const [groupCodeId, setGroupCodeId] = useState("");
  const [codeId, setCodeId] = useState([]);
  const [parentId, setParentId] = useState("");
  const [yesNo, setYesno] = useState("no");
  const [value, setValue] = useState([]);
  const [inptCodeCnt, setInptCodeCnt] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param = [];
    for(let i = 0; i < codeId.length; i++) {
        const tmp = {
            groupCodeId: groupCodeId,
            codeId: codeId[i],
            parentId: parentId === '' ? null : parentId,
            value: value[i]
        }
        param.push(tmp);
    }
    try {
      const response  = await axiosInstance.post("/api/regCmmCode", param);
      if (response.status === 200) {
        alert("성공적으로 저장되었습니다.");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addBtn = () => {
    setInptCodeCnt(inptCodeCnt + 1);
    setCodeId(prev => [...prev, '']);
    setValue(prev => [...prev, '']);
  };

  const minBtn = () => {
    if (inptCodeCnt > 1) {
        setInptCodeCnt(prev => prev - 1);
        setCodeId(prev => prev.slice(0, -1));
        setValue(prev => prev.slice(0, -1));
    }
  };

  const addCodeIdInpt = (i: number, value: string) => {
    setCodeId((prev) => {
        const next = [...prev];
        next[i] = value;
        return next;
    })
  }

  const addValue = (i: number, value: string) => {
    setValue((prev) => {
        const next = [...prev];
        next[i] = value;
        return next;
    }) 
  }

  const addInputBtn = useCallback(() => {
    const result = [];
    for (let i = 0; i < inptCodeCnt; i++) {
      result.push(
        <input
          type="text"
          name="codeId"
          value={codeId[i] ?? ''}
          key={i}
          onChange={(e) => addCodeIdInpt(i, e.target.value)}
        />
      );
    }
    return result;
  }, [inptCodeCnt, codeId]);

  const addValuebtn = useCallback(() => {
    const result = [];
    for (let i = 0; i < inptCodeCnt; i++) {
      result.push(
        <input
          type="text"
          name="value"
          value={value[i] ?? ''}
          key={i}
          onChange={(e) => addValue(i, e.target.value)}
        />
      );
    }
    return result;
  }, [inptCodeCnt, value]);

  const changeYesNo = useCallback((value: string) => {
    setYesno(value);
    if (value === "no") {
      setParentId("");
    }
  }, []);

  return (
    <div className="code-container">
      <h3>공통코드 등록</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>그룹코드 ID:</label>
          <input
            type="text"
            name="groupCodeId"
            value={groupCodeId}
            onChange={(e) => setGroupCodeId(e.target.value)}
          />
        </div>
        <div>
          <label>코드 ID:</label>
          {addInputBtn()}
          <div>
            <button type="button" className="add-btn" onClick={addBtn}>
              +
            </button>
            <button type="button" className="add-btn" onClick={minBtn}>
              -
            </button>
          </div>
        </div>
        <div className="radio-group">
          <label>Parent ID:</label>
          <div className="radio-options">
            <input
              type="radio"
              name="yesNo"
              value="yes"
              checked={yesNo === "yes"}
              onChange={(e) => changeYesNo(e.target.value)}
            />{" "}
            유
            <input
              type="radio"
              name="yesNo"
              value="no"
              checked={yesNo === "no"}
              onChange={(e) => changeYesNo(e.target.value)}
            />{" "}
            무
          </div>
          <input
            type="text"
            placeholder="Parent ID 입력"
            style={{ width: 250 }}
            disabled={yesNo === "no"}
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          />
        </div>
        <div>
          <label>Value:</label>
          {addValuebtn()}
        </div>
        <button type="submit" className="submit-btn">
          등록
        </button>
      </form>
    </div>
  );
}
