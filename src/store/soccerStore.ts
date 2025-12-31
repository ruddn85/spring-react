import { create } from "zustand";

export type TabType =
 | "list"
 | "register"
 | "procedure"
 | "batch";

interface SoccerTeam {
    tabFlg: string;
    setTab: (flg: TabType) => void;
}

export const useSoccerTeamStore = create<SoccerTeam>((set) => ({
    tabFlg: 'list',
    setTab: (flg: string) => set(() => ({ tabFlg: flg})),
}))