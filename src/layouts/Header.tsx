import TabList from "../components/TabLlist";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <>
        <header className="app-header"><NavLink to={'/'}>Spring-React Project</NavLink></header>
        <TabList />
    </>
  )
}
