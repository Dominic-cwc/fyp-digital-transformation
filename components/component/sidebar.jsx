//components
import Link from "next/link";
import {
  IconHome,
  IconDocument,
  IconChartbar,
  IconNotifications,
  IconApplyEvent,
} from "./icon";
import { useEffect, useState } from "react";

export default function SideBar({
  isSidebarOpen,
  setCurrentPage,
  user,
  setIsSidebarOpen,
}) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={
        isSidebarOpen
          ? "sidebar flex flex-col bg-gray-800 text-white"
          : "sidebar closed flex flex-col bg-gray-800 text-white"
      }
    >
      <div className="flex flex-row justify-between items-center flex-shrink-0">
        <div className="flex flex-col justify-between flex-shrink-0 p-4">
          <span className="text-lg font-semibold">DECC System</span>
          <span className="text-sm italic font-semibold">V1.0</span>
        </div>
        {width <= 640 && (
          <svg
            className="h-4 w-4 fill-current text-white mr-6 cursor-pointer hover:text-gray-300"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19.78 18.36L13.41 12l6.37-6.36a1 1 0 10-1.42-1.42L12 10.59l-6.36-6.37a1 1 0 00-1.42 1.42L10.59 12l-6.37 6.36a1 1 0 001.42 1.42L12 13.41l6.36 6.37a1 1 0 001.42 0z" />
          </svg>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <Link
          className="group flex items-center px-4 py-2 text-sm"
          href="/"
          onClick={() => {
            setCurrentPage("Home");
            if (window.innerWidth <= 640) setIsSidebarOpen(!isSidebarOpen);
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
              if (window.innerWidth <= 640) setIsSidebarOpen(!isSidebarOpen);
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
              if (window.innerWidth <= 640) setIsSidebarOpen(!isSidebarOpen);
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
              if (window.innerWidth <= 640) setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <IconApplyEvent className="h-5 w-5 text-gray-300 group-hover:text-white" />
            <span className="ml-2">Apply Event</span>
          </Link>
        ) : null}

        <Link
          className="group flex items-center px-4 py-2 text-sm"
          href="/"
          onClick={() => {
            setCurrentPage("Notifications");
            if (window.innerWidth <= 640) setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <IconNotifications className="h-5 w-5 text-gray-300 group-hover:text-white" />
          <span className="ml-2">Notifications</span>
        </Link>
      </nav>
    </div>
  );
}
