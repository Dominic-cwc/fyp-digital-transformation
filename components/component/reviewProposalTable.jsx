import { useEffect, useState } from "react";
import axios from "axios";
import ReviewProposal from "./reviewProposal";

export default function ReviewProposalTable({ username, role }) {
  const [proposal, setProposal] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [submittedComment, setSubmittedComment] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getRelatedProposals", {
        params: {
          username: username,
          role: role,
        },
      })
      .then((res) => {
        setProposal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(proposal);
  // }, [proposal]);

  useEffect(() => {
    if (submittedComment == null) return;
    axios
      .get("http://localhost:3000/api/getRelatedProposals", {
        params: {
          username: username,
          role: role,
        },
      })
      .then((res) => {
        setProposal(res.data);
        setSubmittedComment(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [submittedComment]);

  return (
    <div>
      {selectedProposal == null && (
        <div className="flex flex-col w-full">
          <div>
            <div className="inline-block min-w-full py-2">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4">
                        活動名稱
                      </th>
                      <th scope="col" className="px-6 py-4">
                        提案人
                      </th>
                      <th scope="col" className="px-6 py-4">
                        提案時間
                      </th>
                      <th scope="col" className="px-6 py-4">
                        狀態
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.map((item, index) => (
                      <tr
                        className="border-b dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                        key={index}
                        onClick={() => {
                          setSelectedProposal(index);
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {item.eventName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {item.createdby.personalname}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.status == "pending" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          ) : item.status == "approved" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          ) : item.status == "rejected" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Rejected
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                    {proposal.length == 0 && (
                      <tr className="border-b dark:border-neutral-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            No proposal found.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProposal != null && (
        // back to table a button
        <div>
          <ReviewProposal
            proposalContent={proposal[selectedProposal]}
            setSelectedProposal={setSelectedProposal}
            setSubmittedComment={setSubmittedComment}
            role={role}
            username={username}
          />
        </div>
      )}
    </div>
  );
}
