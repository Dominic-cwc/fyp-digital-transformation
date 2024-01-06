//components
import Link from "next/link";
import { IconHome, IconDocument, IconChartbar } from "./icon";
import { useEffect } from "react";

export default function SideBar({ isSidebarOpen, setCurrentPage, user }) {
  useEffect(() => {
    console.log(user.role);
  }, [user.role]);

  return (
    <div
      className={
        isSidebarOpen
          ? "sidebar flex flex-col bg-gray-800 text-white"
          : "sidebar closed flex flex-col bg-gray-800 text-white"
      }
    >
      <div className="flex flex-col justify-between flex-shrink-0 p-4">
        <span className="text-lg font-semibold">DECC System</span>
        <span className="text-sm italic font-semibold">V1.0</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <Link
          className="group flex items-center px-4 py-2 text-sm"
          href="/"
          onClick={() => {
            setCurrentPage("Home");
          }}
        >
          <IconHome className="h-5 w-5 text-gray-300 group-hover:text-white" />
          <span className="ml-2">Home</span>
        </Link>
        {user.role == "staff" ? (
          <Link
            className="group flex items-center px-4 py-2 text-sm"
            onClick={() => {
              setCurrentPage("Create Proposal");
            }}
            href="/"
          >
            <IconDocument className="h-5 w-5 text-gray-300 group-hover:text-white" />
            <span className="ml-2">Create Proposal</span>
          </Link>
        ) : null}

        {user.role == "deptmanager" ||
        user.role == "centermanager" ||
        user.role == "staff" ? (
          <Link
            className="group flex items-center px-4 py-2 text-sm"
            href="/"
            onClick={() => {
              setCurrentPage("Review Proposal");
            }}
          >
            <IconChartbar className="h-5 w-5 text-gray-300 group-hover:text-white" />
            <span className="ml-2">Review Proposal</span>
          </Link>
        ) : null}

        {user.role == "user" ? (
          <Link
            className="group flex items-center px-4 py-2 text-sm"
            href="/"
            onClick={() => {
              setCurrentPage("Apply Event");
            }}
          >
            <img src="/icons/event.svg" className="h-5 w-5" />
            <span className="ml-2">Apply Event</span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
