import { axiosInstance } from "../api/axiosInstance";

export default function Batch() {
    const batchAction = async() => {
        try {
            const response = await axiosInstance('/api/deleteSoccerPost')
            if(response.status === 200) {
                alert('정상적으로 실행되었습니다');
            }
        }catch(error) {
            console.log(error)
        }
    }
  return (
    <div style={{ padding: "16px" }}>
      <h3>Batch</h3>

      <button
        type="button"
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer"
        }}
        onClick={batchAction}
      >
        배치 실행
      </button>
    </div>
  );
}
