import { useEffect, useState } from "react";
import axios from "axios";
import ApplyEventDetail from "./applyEventDetail";

export default function ApplyEventTable({ username }) {
  const [event, setEvent] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submittedEvent, setSubmittedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getAllEvents", {})
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (submittedEvent == null) return;
    axios
      .get("http://localhost:3000/api/getAllEvents", {})
      .then((res) => {
        setEvent(res.data);
        setSubmittedEvent(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [submittedEvent]);

  return (
    <div>
      {selectedEvent == null && (
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
                        活動日期
                      </th>
                      <th scope="col" className="px-6 py-4">
                        活動時間
                      </th>
                      <th scope="col" className="px-6 py-4">
                        創建時間
                      </th>
                      <th scope="col" className="px-6 py-4">
                        狀態
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.map((event, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-neutral-700"
                        onClick={() => {
                          setSelectedEvent(index);
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.eventName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.eventDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.eventTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.createdTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.applicant.includes(username) ? (
                              <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full">
                                  已報名
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                  未報名
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedEvent != null && (
        <div>
          <ApplyEventDetail
            EventDetail={event[selectedEvent]}
            setSelectedEvent={setSelectedEvent}
            ApplyStatus={event[selectedEvent].applicant.includes(username)}
            username={username}
            setSubmittedEvent={setSubmittedEvent}
          />
        </div>
      )}
    </div>
  );
}
