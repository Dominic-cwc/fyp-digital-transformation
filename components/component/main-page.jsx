//React
import { useState } from "react";

//components
import { Button } from "@/components/ui/button";
import { IconMenu, IconClose } from "./icon";
import SideBar from "./sidebar";
import Proposal from "./proposalTemplate";
import ReviewProposalTable from "./reviewProposalTable";
import ApplyEventTable from "./applyEventTable";
import NotificationTable from "./notificationTable";
import Image from "next/image";

export default function MainPage({ user, logout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Home");
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  return (
    <>
      {user && (
        <div className="flex h-screen w-screen">
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setCurrentPage={setCurrentPage}
            user={user}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          <div className="w-screen h-full flex flex-col overflow-x-auto mainScreen">
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
              <div className="flex flex-row">
                {currentPage == "Create Proposal" && (
                  <Button
                    className="mr-2 bg-gray-400 transition-all duration-300 ease-in-out hover:bg-red-400"
                    title="Event Safety Suggestion"
                    onClick={() => setIsSuggestionOpen(!isSuggestionOpen)}
                  >
                    <span className="sr-only">Event Safety Suggestion</span>
                    <Image
                      src="/icons/inquiry.svg"
                      height={15}
                      width={15}
                      alt=""
                    />
                  </Button>
                )}

                <Button
                  className="bg-gray-400 transition-all duration-300 ease-in-out hover:bg-red-400"
                  title="Logout"
                  onClick={logout}
                >
                  <span className="sr-only">Logout</span>
                  <Image
                    src="/icons/logout.svg"
                    alt=""
                    width={12}
                    height={12}
                  />
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
              {currentPage == "Home" ? (
                <div>
                  <h1 className="text-lg font-semibold">Welcome back, User!</h1>
                  <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* <p>1</p>
                      <p>2</p>
                      <p>3</p>
                      <p>4</p> */}
                  </div>
                </div>
              ) : null}

              {currentPage == "Create Proposal" ? (
                <div>
                  <Proposal
                    user={user}
                    isSuggestionOpen={isSuggestionOpen}
                    setIsSuggestionOpen={setIsSuggestionOpen}
                  />
                </div>
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
                <NotificationTable username={user.username} role={user.role} />
              ) : null}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
