import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.tsx";

export default function App({ navBarHeight }: { navBarHeight: string }) {
  return (
    <>
      <NavBar navBarHeight={navBarHeight} />
      <Outlet />
    </>
  );
}
