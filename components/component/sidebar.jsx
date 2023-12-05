//components
import Link from "next/link";
import { IconHome, IconDocument, IconChartbar } from "./icon";
import { useEffect } from "react";

export default function SideBar({ isSidebarOpen, setCurrentPage, userRole }) {
  useEffect(() => {
    console.log(userRole);
  }, [userRole]);

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
        {userRole == "staff" ? (
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

        {userRole == "manager" || userRole == "staff" ? (
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

        {userRole == "user" ? (
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
