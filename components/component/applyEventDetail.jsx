import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function ApplyEventDetail({
  EventDetail,
  setSelectedEvent,
  ApplyStatus,
  username,
  setSubmittedEvent,
}) {
  const [clickedApply, setClickedApply] = useState(false);

  const applyEvent = () => {
    axios
      .post("/api/applyEvent", {
        eventID: EventDetail._id,
        username: username,
      })
      .then(() => {
        setSubmittedEvent(true);
        alert("報名成功");
        setSelectedEvent(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelApplyEvent = () => {
    axios
      .post("/api/cancelApplyEvent", {
        eventID: EventDetail._id,
        username: username,
      })
      .then(() => {
        setSubmittedEvent(true);
        alert("取消報名成功");
        setSelectedEvent(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {clickedApply ? (
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
              onClick={() => setClickedSubmit(false)}
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="h-36 flex items-center justify-center  bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-5">
                    確定{ApplyStatus ? "取消" : null}報名？
                  </div>
                  <div className="flex flex-row">
                    <Button
                      className="bg-gray-400 transition-all duration-300 ease-in-out hover:bg-green-400"
                      onClick={() => {
                        setClickedApply(null);
                        if (ApplyStatus) {
                          cancelApplyEvent();
                        } else {
                          applyEvent();
                        }
                      }}
                    >
                      確定
                    </Button>
                    <Button
                      className="bg-gray-400 transition-all duration-300 ease-in-out hover:bg-red-400 ml-2"
                      onClick={() => setClickedApply(null)}
                    >
                      取消
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-row justify-between mb-4">
        <Button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setSelectedEvent(null);
          }}
        >
          返回
        </Button>
        {!ApplyStatus ? (
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setClickedApply(true);
            }}
          >
            報名
          </Button>
        ) : null}

        {ApplyStatus ? (
          <Button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setClickedApply(true);
            }}
          >
            取消報名
          </Button>
        ) : null}
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動名稱:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventName}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動類型:</Label>
        {EventDetail.eventTypes.map((item, index) => {
          return (
            <Label className="ml-2 text-sm  md:text-base" key={index}>
              {item.split(/\s(.+)/)[0]}
            </Label>
          );
        })}
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動日期:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventDate}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動時間:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventTime}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">逢星期:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventWeek}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">節數:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventNum}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動地點:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventLocation}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動人數:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventQuota}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動費用:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventFee}
        </Label>
      </div>
      <div className="flex flex-row">
        <Label className="text-sm  md:text-base">活動目的:</Label>
        <Label className="ml-2 text-sm  md:text-base">
          {EventDetail.eventpurpose}
        </Label>
      </div>
    </div>
  );
}
