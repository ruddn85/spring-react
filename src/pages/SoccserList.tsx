import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { SoccerTeam } from "../types/SoccerTeam";
import type { ColDef } from "ag-grid-community";
import { useNavigate } from "react-router";

// 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

export default function SoccerList() {
  const [soccerList, setSoccerList] = useState<SoccerTeam[]>([]);
  const navigate = useNavigate();

  const columns: ColDef<SoccerTeam>[] = [
    { headerName: "인덱스", field: "postId" as keyof SoccerTeam, sortable: true, filter: true },
    { headerName: "작성자", field: "author" as keyof SoccerTeam, sortable: true, filter: true },
    { headerName: "팀", field: "team" as keyof SoccerTeam, sortable: true, filter: true },
    { headerName: "내용", field: "content" as keyof SoccerTeam, sortable: true, filter: true },
    { headerName: "등록일", field: "createdAt" as keyof SoccerTeam, sortable: true, filter: true },
    { headerName: "수정일", field: "updatedAt" as keyof SoccerTeam, sortable: true, filter: true },
  ];

  useEffect(() => {
    const getSoccerList = async () => {
      try {
        const res = await axiosInstance.get("/api/getSoccerList");
        setSoccerList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getSoccerList();
  }, []);

  const onCellDoubleClicked = useCallback((e) => {
    navigate(`/register/${e.data.postId}`);
  }, [navigate])

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact<SoccerTeam>
        rowData={soccerList}
        columnDefs={columns}
        defaultColDef={{ flex: 1, minWidth: 120 }}
        rowSelection="single"
        pagination={true}
        paginationPageSize={10}
        onCellDoubleClicked={onCellDoubleClicked}
      />
    </div>
  );
}
