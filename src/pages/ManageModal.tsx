import "ag-grid-community/styles/ag-theme-alpine.css";
import { Modal, Button } from "antd";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import type { Manage } from "../types/Manage";
import type { ColDef } from "ag-grid-community";

interface ManageModalProps {
  open: boolean;
  onClose: () => void;
  width: number | string;
}

interface SelectedManage {
    managerId: string;
    managerName: string;
}

export default function ManageModal({ open, onClose, width }: ManageModalProps) {
  const [manageList, setManageList] = useState([]);
  const [selectedManage, setSelectedManage] = useState<SelectedManage>({});
  const onConfirm = () => {
    onClose(selectedManage);
  };
  useEffect(() => {
    if(!open) return;
    const getManageList = async () => {
        try {
            const res = await axiosInstance('/api/selectManageList');
            if(res.status === 200) {
                setManageList(res.data);
            }
        }catch(error){
            console.error(error);
        }
    }
    getManageList();
  }, [open]);

  const rowSelection = (e) => {
    setSelectedManage({ managerId: e.data.managerId, managerName: e.data.managerName});
  }

  const columns: ColDef<Manage>[] = [
    {
      headerName: "인덱스",
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      sortable: true,
      filter: true,
      width: 100,
    },
    { headerName: "리그", field: "league" as keyof Manage, sortable: true, filter: true },
    { headerName: "팀", field: "team" as keyof Manage, sortable: true, filter: true },
    { headerName: "이름", field: "managerName" as keyof Manage, sortable: true, filter: true },
    { headerName: "입사일", field: "joinDate" as keyof Manage, sortable: true, filter: true },
    { headerName: "퇴사일", field: "resignDate" as keyof Manage, sortable: true, filter: true },
  ];

  return (
    <Modal
      title="감독 목록"
      open={open}
      onOk={onConfirm}
      onCancel={onClose}
      okText="확인"
      cancelText="취소"
      width={width}
    >
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact<Manage>
          rowData={manageList}
          columnDefs={columns}
          defaultColDef={{ flex: 1, minWidth: 120 }}
          rowSelection="single"
          pagination={true}
          paginationPageSize={10}
          onRowClicked={rowSelection}
        />
      </div>
    </Modal>
  );
}
