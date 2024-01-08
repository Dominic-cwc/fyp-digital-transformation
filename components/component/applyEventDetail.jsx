import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ApplyEventDetail({
  EventDetail,
  setSelectedEvent,
  ApplyStatus,
}) {
  return (
    <div>
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
              setSelectedEvent(null);
            }}
          >
            報名
          </Button>
        ) : null}

        {ApplyStatus ? (
          <Button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setSelectedEvent(null);
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
