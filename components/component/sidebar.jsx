//components
import Link from "next/link";
import { IconHome, IconDocument, IconChartbar } from "./icon";

export default function SideBar({ isSidebarOpen, setCurrentPage, userRole }) {
  return (
    <div
      className={
        isSidebarOpen
          ? "sidebar flex flex-col bg-gray-800 text-white"
          : "sidebar closed flex flex-col bg-gray-800 text-white"
      }
    >
      <div className="flex items-center justify-between flex-shrink-0 p-4">
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <Link className="group flex items-center px-4 py-2 text-sm" href="/">
          <IconHome className="h-5 w-5 text-gray-300 group-hover:text-white" />
          <span className="ml-2">Home</span>
        </Link>
        <Link
          className="group flex items-center px-4 py-2 text-sm"
          onClick={() => {
            setCurrentPage("Documents");
          }}
          href="#"
        >
          <IconDocument className="h-5 w-5 text-gray-300 group-hover:text-white" />
          <span className="ml-2">Create Proposal</span>
        </Link>
        <Link className="group flex items-center px-4 py-2 text-sm" href="#">
          <IconChartbar className="h-5 w-5 text-gray-300 group-hover:text-white" />
          <span className="ml-2">Review Proposal</span>
        </Link>
      </nav>
    </div>
  );
}
