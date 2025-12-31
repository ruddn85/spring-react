import { Tree } from "antd";
import "../style/Tree.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";

export default function TeamTree() {
  const [treeData, setTreeData] = useState([]);
  //   const [treeData, setTreeData] = useState([
  //     {
  //       title: "Ligue 1",
  //       key: "1",
  //       children: [
  //         { title: "PSG", key: "11" },
  //         { title: "Marseille", key: "12" },
  //       ],
  //     },
  //   ]);
  //   const [onSelect, setOnSelect] = useState('');
  const [selectedNode, setSelectedNode] = useState("");

  //   const buildTree = (data: any[]) => {
  //     const nodeMap = new Map();
  //     const roots: any[] = [];

  //     // 1. 모든 노드를 map에 등록
  //     data.forEach((item) => {
  //       nodeMap.set(item.key, {
  //         key: item.key,
  //         title: item.title,
  //         type: item.type,
  //         parentId: item.parentId,
  //         children: [],
  //       });
  //     });

  //     // 2. 부모-자식 연결
  //     nodeMap.forEach((node) => {
  //       if (node.parentId) {
  //         const parent = nodeMap.get(node.parentId);
  //         if (parent) {
  //           parent.children.push(node);
  //         }
  //       } else {
  //         // parentId 없으면 루트
  //         roots.push(node);
  //       }
  //     });

  //     return roots;
  //   };

  const buildTree = (data: []) => {
    const nodeMap = new Map();
    const root = [];

    data.forEach((item) => {
      nodeMap.set(item.key, {
        key: item.key,
        title: item.title,
        type: item.type,
        parentId: item.parentId,
        children: [],
      });
    });

    nodeMap.forEach((node) => {
      if(node.parentId) {
        nodeMap.get(node.parentId).children.push(node);
      }else{
        root.push(node);
      }
    })

    return root;
  };

  useEffect(() => {
    const getSoccerTree = async () => {
      try {
        const response = await axiosInstance("/api/getSoccerTree");
        if (response.status === 200) {
          const res = buildTree(response.data);
          setTreeData(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSoccerTree();
  }, []);

  return (
    <>
      <div className="container">
        {/* 왼쪽 Tree 영역 */}
        <div className="tree-panel">
          <Tree
            treeData={treeData}
            onSelect={(keys, info) => setSelectedNode(info.node)}
            defaultExpandAll
            showLine
          />
        </div>

        {/* 오른쪽 상세 영역 */}
        <div className="detail-panel"></div>
      </div>
    </>
  );
}
