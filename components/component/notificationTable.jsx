import { useState, useEffect } from "react";
import axios from "axios";
import { IconFlag } from "./icon";
import { Label } from "../ui/label";

export default function NotificationTable({ username, role }) {
  const [notification, setNotification] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [readNotification, setReadNotification] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getNotifications", {
        params: {
          username: username,
          role: role,
        },
      })
      .then((res) => {
        setNotification(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(notification);
  // }, [notification]);

  useEffect(() => {
    if (readNotification == null) return;
    axios
      .get("http://localhost:3000/api/getNotifications", {
        params: {
          username: username,
          role: role,
        },
      })
      .then((res) => {
        setNotification(res.data);
        setReadNotification(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [readNotification]);

  return (
    // open modal to show notification content

    <div>
      {selectedNotification != null && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => {
                if (selectedNotification.checked) {
                  setSelectedNotification(null);
                  return;
                }
                axios
                  .post("/api/checkedNotification", {
                    notificationID: selectedNotification._id,
                    forUser: selectedNotification.forUser,
                  })
                  .then(() => {
                    setReadNotification(true);
                    setSelectedNotification(null);
                  });
              }}
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="py-3 px-6 flex flex-row-reverse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => {
                    if (selectedNotification.checked) {
                      setSelectedNotification(null);
                      return;
                    }
                    axios
                      .post("/api/checkedNotification", {
                        notificationID: selectedNotification._id,
                        forUser: selectedNotification.forUser,
                      })
                      .then(() => {
                        setReadNotification(true);
                        setSelectedNotification(null);
                      });
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="bg-white px-4 pb-4 sm:pb-4">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Label className="text-lg font-semibold">
                        {selectedNotification.title}
                      </Label>
                      <Label className="text-sm">
                        {selectedNotification.time}
                      </Label>
                    </div>

                    <div className="flex flex-row">
                      {selectedNotification.flag == "red" &&
                      !selectedNotification.checked ? (
                        <IconFlag
                          className="h-5 w-5 text-red-500"
                          title="未讀"
                        />
                      ) : selectedNotification.flag == "blue" &&
                        !selectedNotification.checked ? (
                        <IconFlag
                          className="h-5 w-5 text-blue-500"
                          title="未讀"
                        />
                      ) : selectedNotification.flag == "none" &&
                        !selectedNotification.checked ? (
                        <IconFlag
                          className="h-5 w-5 text-gray-500"
                          title="未讀"
                        />
                      ) : null}

                      {selectedNotification.flag == "red" &&
                      selectedNotification.checked ? (
                        <IconFlag
                          className="h-5 w-5 text-red-800"
                          title="已讀"
                        />
                      ) : selectedNotification.flag == "blue" &&
                        selectedNotification.checked ? (
                        <IconFlag
                          className="h-5 w-5 text-blue-800"
                          title="已讀"
                        />
                      ) : selectedNotification.flag == "none" &&
                        selectedNotification.checked ? (
                        <IconFlag
                          className="h-5 w-5 text-gray-800"
                          title="已讀"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>{selectedNotification.content}</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row">
        <IconFlag className="h-5 w-5 text-gray-500" />
        <Label className="mt-1">:資訊</Label>

        <IconFlag className="h-5 w-5 text-blue-500 ml-3" />
        <Label className="mt-1">:提醒</Label>

        <IconFlag className="h-5 w-5 text-red-500 ml-3" />
        <Label className="mt-1">:需要行動</Label>
      </div>

      <div className="flex flex-col w-full">
        <div>
          <div className="inline-block min-w-full py-2">
            <div className="overflow-hidden">
              <table className="presentTable min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      標題
                    </th>
                    <th scope="col" className="px-6 py-4">
                      創建時間
                    </th>
                    <th scope="col" className="px-6 py-4">
                      類型
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {notification.map((notification, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer transition-all hover:bg-gray-100"
                      onClick={() => {
                        setSelectedNotification(notification);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {notification.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {notification.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {notification.flag == "red" && !notification.checked ? (
                          <IconFlag className="h-5 w-5 text-red-500" />
                        ) : notification.flag == "blue" &&
                          !notification.checked ? (
                          <IconFlag className="h-5 w-5 text-blue-500" />
                        ) : notification.flag == "none" &&
                          !notification.checked ? (
                          <IconFlag className="h-5 w-5 text-gray-500" />
                        ) : null}

                        {notification.flag == "red" && notification.checked ? (
                          <IconFlag className="h-5 w-5 text-red-800" />
                        ) : notification.flag == "blue" &&
                          notification.checked ? (
                          <IconFlag className="h-5 w-5 text-blue-800" />
                        ) : notification.flag == "none" &&
                          notification.checked ? (
                          <IconFlag className="h-5 w-5 text-gray-800" />
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
