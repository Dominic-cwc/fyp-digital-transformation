//React
import { useEffect, useState } from "react";

//components
import { Button } from "@/components/ui/button";
import { IconMenu, IconClose } from "./icon";
import SideBar from "./sidebar";
import Proposal from "./proposalTemplate";
import ReviewProposalTable from "./reviewProposalTable";
import ApplyEventTable from "./applyEventTable";
import NotificationTable from "./notificationTable";

export default function MainPage({ user, logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {user && (
        <div className="flex h-screen">
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setCurrentPage={setCurrentPage}
            user={user}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          {(!isSidebarOpen || window.innerWidth >= 768) && (
            <div className="w-full flex flex-col">
              <header className="flex items-center justify-between flex-shrink-0 px-4 py-2 bg-gray-300 border-b">
                <Button
                  className={
                    isSidebarOpen
                      ? "bg-gray-400 transition-all duration-300 ease-in-out hover:bg-red-400"
                      : "bg-gray-400 transition-all duration-300 ease-in-out hover:bg-gray-500"
                  }
                  size="icon"
                  variant="outline"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {!isSidebarOpen && <IconMenu className="h-5 w-5" />}
                  {isSidebarOpen && <IconClose className="h-5 w-5" />}

                  <span className="sr-only">Open sidebar</span>
                </Button>
                <span className="text-lg font-semibold">{currentPage}</span>
                <Button
                  className="bg-gray-400 transition-all duration-300 ease-in-out hover:bg-red-400"
                  title="Logout"
                  onClick={logout}
                >
                  <span className="sr-only">Logout</span>
                  <img src="/icons/logout.svg" className="h-3 w-3" />
                </Button>
              </header>
              <main className="flex-1 overflow-y-auto p-4">
                {currentPage == "Home" ? (
                  <div>
                    <h1 className="text-lg font-semibold">
                      Welcome back, User!
                    </h1>
                    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                      {/* <p>1</p>
                      <p>2</p>
                      <p>3</p>
                      <p>4</p> */}
                    </div>
                  </div>
                ) : null}

                {currentPage == "Create Proposal" ? (
                  <Proposal user={user} />
                ) : null}

                {currentPage == "Review Proposal" ? (
                  <ReviewProposalTable
                    username={user.username}
                    role={user.role}
                  />
                ) : null}

                {currentPage == "Apply Event" ? (
                  <ApplyEventTable username={user.username} />
                ) : null}

                {currentPage == "Notifications" ? (
                  <NotificationTable
                    username={user.username}
                    role={user.role}
                  />
                ) : null}
              </main>
            </div>
          )}
        </div>
      )}
    </>
  );
}
