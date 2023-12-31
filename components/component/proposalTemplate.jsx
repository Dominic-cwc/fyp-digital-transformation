import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Proposal() {
  const eventTypes = [
    "社交及康樂 DECC 3b/NEC 3a(iii)",
    "長者教育/發展 DECC 3a(i)/NEC3a(ii)",
    "義工發展 DECC 3a(ii)/NEC 3b",
    "長者互助 DECC 4a",
    "護老者支援 DECC 4b/NEC 3c",
    "治療小組 DECC 5c",
    "健康及積極晚年 NEC 3a(i)",
    "支援培訓活動 DECC 8",
    "長者會員協助策劃及推行 DECC 4/NEC 4",
    "減輕護老壓力 DECC 5/NEC 5",
    "認知能力訓練活動 DECC Supplementary 1(a)",
    "以認知障礙症患者之護老者為對象之活動 DECC Supplementary 2(a)",
  ];
  const eventDetails = [
    "舉辦日期",
    "逢星期",
    "舉辦時間",
    "節數",
    "地點",
    "對象",
    "名額",
    "費用",
    "導師姓名",
    "工作員人數",
    "義工人數",
    "參加者類別",
  ];
  const [page, setPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  const [decc8, setDecc8] = useState(false);
  const [decc4, setDecc4] = useState(false);
  const [decc5, setDecc5] = useState(false);
  const [proposalContent, setProposalContent] = useState({});
  const [eventName, setEventName] = useState("");
  const [decc8Content, setDecc8Content] = useState("");
  const [decc4Content, setDecc4Content] = useState("");
  const [decc5Content, setDecc5Content] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventWeek, setEventWeek] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventNum, setEventNum] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTarget, setEventTarget] = useState("");
  const [eventQuota, setEventQuota] = useState("");
  const [eventFee, setEventFee] = useState("");
  const [eventTutor, setEventTutor] = useState("");
  const [eventStaffNum, setEventStaffNum] = useState("");
  const [eventElderlyNum, setEventElderlyNum] = useState("");
  const [eventOthersNum, setEventOthersNum] = useState("");
  const [eventApplicant, setEventApplicant] = useState({
    member: false,
    nonmember: false,
    others: false,
    othersname: "",
  });

  const handleCheckChange = (event) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, event.target.name]);

      if (event.target.name == "支援培訓活動 DECC 8") {
        setDecc8(true);
      }
      if (event.target.name == "長者會員協助策劃及推行 DECC 4/NEC 4") {
        setDecc4(true);
      }
      if (event.target.name == "減輕護老壓力 DECC 5/NEC 5") {
        setDecc5(true);
      }
    } else {
      setCheckedItems(
        checkedItems.filter((item) => item !== event.target.name)
      );
      if (event.target.name == "支援培訓活動 DECC 8") {
        setDecc8(false);
      }
      if (event.target.name == "長者會員協助策劃及推行 DECC 4/NEC 4") {
        setDecc4(false);
      }
      if (event.target.name == "減輕護老壓力 DECC 5/NEC 5") {
        setDecc5(false);
      }
    }
  };

  const handleInputEventDetails = (type, data = "") => {
    if (type == "舉辦日期") {
      setEventDate(data);
    } else if (type == "逢星期") {
      setEventWeek(data);
    } else if (type == "舉辦時間") {
      setEventTime(data);
    } else if (type == "節數") {
      setEventNum(data);
    } else if (type == "地點") {
      setEventLocation(data);
    } else if (type == "對象") {
      setEventTarget(data);
    } else if (type == "名額") {
      setEventQuota(data);
    } else if (type == "費用") {
      setEventFee(data);
    } else if (type == "導師姓名") {
      setEventTutor(data);
    } else if (type == "工作員人數") {
      setEventStaffNum(data);
    } else if (type == "elderlynum") {
      setEventElderlyNum(data);
    } else if (type == "othersnum") {
      setEventOthersNum(data);
    } else if (type == "member") {
      setEventApplicant((prevState) => ({
        ...prevState,
        member: !prevState.member,
      }));
    } else if (type == "nonmember") {
      setEventApplicant((prevState) => ({
        ...prevState,
        nonmember: !prevState.nonmember,
      }));
    } else if (type == "others") {
      setEventApplicant((prevState) => ({
        ...prevState,
        others: !prevState.others,
      }));
    } else if (type == "othersname") {
      setEventApplicant((prevState) => ({
        ...prevState,
        othersname: data,
      }));
    }
  };

  const getInputs = (type) => {
    if (type == "舉辦日期") {
      return eventDate;
    } else if (type == "逢星期") {
      return eventWeek;
    } else if (type == "舉辦時間") {
      return eventTime;
    } else if (type == "節數") {
      return eventNum;
    } else if (type == "地點") {
      return eventLocation;
    } else if (type == "對象") {
      return eventTarget;
    } else if (type == "名額") {
      return eventQuota;
    } else if (type == "費用") {
      return eventFee;
    } else if (type == "導師姓名") {
      return eventTutor;
    } else if (type == "工作員人數") {
      return eventStaffNum;
    }
  };

  const handlePageChange = (type) => {
    if (type == "prev" && page > 1) {
      setPage(page - 1);
    } else if (type == "next" && page < 3) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);

  return (
    <div>
      {page == 1 ? (
        <div
          id="甲部"
          className="text-sm  md:text-base border-solid border-2 border-gray-900 w-full"
        >
          <div className="title mb-2">甲部：活動 ∕ 小組一般資料</div>
          <div>
            <div className="flex flex-row">
              <Label htmlFor="eventname" className="text-sm  md:text-base">
                活動名稱：
              </Label>
              <Input
                id="eventname"
                className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                required
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className=" mt-1 flex flex-row">
              <Label
                htmlFor="eventtypes"
                className="text-sm md:text-base w-2/12"
              >
                性質：
              </Label>
              <table id="eventtypes">
                <tbody className="grid gap-4 md:grid-cols-2">
                  {eventTypes.map((item) => (
                    <tr key={item}>
                      <td>
                        <input
                          type="checkbox"
                          name={item}
                          checked={checkedItems.includes(item)}
                          onChange={handleCheckChange}
                        />
                      </td>
                      <td className="text-sm  md:text-base">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {decc8 ? (
              <div className="flex flex-row mt-1">
                <Label htmlFor="decc8" className="text-sm  md:text-base">
                  支援培訓活動 DECC 8：
                </Label>
                <Input
                  id="decc8"
                  className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                  required
                  type="text"
                  value={decc8Content}
                  onChange={(e) => setDecc8Content(e.target.value)}
                />
              </div>
            ) : null}

            {decc4 ? (
              <div className="flex flex-row mt-1">
                <Label htmlFor="decc4" className="text-sm  md:text-base">
                  長者會員協助策劃及推行 DECC 4/NEC 4：
                </Label>
                <Input
                  id="decc4"
                  className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                  required
                  type="text"
                  value={decc4Content}
                  onChange={(e) => setDecc4Content(e.target.value)}
                />
              </div>
            ) : null}

            {decc5 ? (
              <div className="flex flex-row mt-1 mb-1">
                <Label htmlFor="decc5" className="text-sm  md:text-base">
                  減輕護老壓力 DECC 5/NEC 5：
                </Label>
                <Input
                  id="decc5"
                  className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                  required
                  type="text"
                  value={decc5Content}
                  onChange={(e) => setDecc5Content(e.target.value)}
                />
              </div>
            ) : null}

            <div className="grid gap-2 md:grid-cols-2 w-full">
              {eventDetails.map((item) => {
                if (item == "義工人數") {
                  return (
                    <div key={item} className="flex flex-row w-full">
                      <Label className="text-sm md:text-base">{item}：</Label>
                      <Label
                        htmlFor="elderlynum"
                        className="text-sm md:text-base"
                      >
                        長者
                      </Label>
                      <Input
                        id="elderlynum"
                        className="focus:ring-gray-400 ml-2 w-1/12 h-8"
                        required
                        type="text"
                        value={eventElderlyNum}
                        onChange={(e) =>
                          handleInputEventDetails(e.target.id, e.target.value)
                        }
                      />
                      <Label
                        htmlFor="othersnum"
                        className="text-sm ml-2 md:text-base"
                      >
                        其他
                      </Label>
                      <Input
                        id="othersnum"
                        className="focus:ring-gray-400 ml-2 w-1/12 h-8"
                        required
                        type="text"
                        value={eventOthersNum}
                        onChange={(e) =>
                          handleInputEventDetails(e.target.id, e.target.value)
                        }
                      />
                    </div>
                  );
                } else if (item == "參加者類別") {
                  return (
                    <div key={item} className="flex flex-row w-full">
                      <Label className="text-sm md:text-base">{item}：</Label>

                      <input
                        id="member"
                        required
                        type="checkbox"
                        checked={eventApplicant.member}
                        onChange={(e) => handleInputEventDetails(e.target.id)}
                      />
                      <Label
                        htmlFor="member"
                        className="mt-1 text-sm md:text-base"
                      >
                        會員
                      </Label>

                      <input
                        className="ml-2"
                        id="nonmember"
                        required
                        type="checkbox"
                        checked={eventApplicant.nonmember}
                        onChange={(e) => handleInputEventDetails(e.target.id)}
                      />
                      <Label
                        htmlFor="member"
                        className="mt-1 text-sm md:text-base"
                      >
                        非會員
                      </Label>

                      <input
                        className="ml-2"
                        id="others"
                        required
                        type="checkbox"
                        checked={eventApplicant.others}
                        onChange={(e) => handleInputEventDetails(e.target.id)}
                      />
                      <Label
                        htmlFor="others"
                        className="mt-1 text-sm  md:text-base"
                      >
                        其他
                      </Label>
                      <Input
                        id="othersname"
                        className="focus:ring-gray-400 ml-2 w-1/12 h-8"
                        required
                        type="text"
                        value={eventApplicant.othersname}
                        onChange={(e) =>
                          handleInputEventDetails(e.target.id, e.target.value)
                        }
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={item} className="flex flex-row w-full">
                      <Label htmlFor={item} className="text-sm md:text-base">
                        {item}：
                      </Label>
                      <Input
                        id={item}
                        className="focus:ring-gray-400 ml-2 w-3/4 h-8"
                        required
                        type="text"
                        value={getInputs(item)}
                        onChange={(e) =>
                          handleInputEventDetails(e.target.id, e.target.value)
                        }
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      ) : null}

      {page == 2 ? (
        <div
          id="乙部"
          className="text-sm  md:text-base border-solid border-2 border-gray-900 w-full"
        >
          <div className="title mb-2">乙部：目的及內容</div>
          <div>
            <div className="flex flex-row">
              <Label htmlFor="eventpurpose" className="text-sm  md:text-base">
                目的：
              </Label>
              <textarea
                id="eventpurpose"
                className="ring-2 ring-gray-400 w-1/2 ml-20 mb-2 h-32"
                required
                type="text"
                value={proposalContent.eventpurpose}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    eventpurpose: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-row">
              <Label htmlFor="eventevaluate" className="text-sm  md:text-base">
                評估指標/方法：
              </Label>
              <textarea
                id="eventpurpose"
                className="ring-2 ring-gray-400 w-1/2 ml-2 mb-2 h-32"
                required
                type="text"
                value={proposalContent.eventevaluate}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    eventevaluate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-row">
              <Label
                htmlFor="eventpurposedetail"
                className="text-sm  md:text-base"
              >
                內容大要：
              </Label>
              <textarea
                id="eventpurposedetail"
                className="ring-2 ring-gray-400 w-1/2 ml-12 mb-2 h-32"
                required
                type="text"
                value={proposalContent.eventpurposedetail}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    eventpurposedetail: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-row">
              <Label htmlFor="pagetwonote" className="text-sm  md:text-base">
                備註：
              </Label>
              <textarea
                id="pagetwonote"
                className="ring-2 ring-gray-400 w-1/2 ml-20 mb-2 h-32"
                required
                type="text"
                value={proposalContent.pagetwonote}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    pagetwonote: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      ) : null}

      {page == 3 ? (
        <div
          id="丙部"
          className="text-sm  md:text-base border-solid border-2 border-gray-900 w-full"
        >
          <div className="title mb-2">丙部：財政預算</div>
          <div>
            <div className="flex flex-row">
              <Label htmlFor="eventrevenue" className="text-sm  md:text-base">
                收入：
              </Label>
              <textarea
                id="eventrevenue"
                className="ring-2 ring-gray-400 w-1/2 ml-20 mb-2 h-32"
                required
                type="text"
                value={proposalContent.eventrevenue}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    eventrevenue: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-row">
              <Label htmlFor="eventbudget" className="text-sm  md:text-base">
                支出：
              </Label>
              <textarea
                id="eventbudget"
                className="ring-2 ring-gray-400 w-1/2 ml-20 mb-2 h-32"
                required
                type="text"
                value={proposalContent.eventbudget}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    eventbudget: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-row">
              <Label htmlFor="pagethreenote" className="text-sm  md:text-base">
                備註：
              </Label>
              <textarea
                id="pagethreenote"
                className="ring-2 ring-gray-400 w-1/2 ml-20 mb-2 h-32"
                required
                type="text"
                value={proposalContent.pagethreenote}
                onChange={(e) =>
                  setProposalContent((prevState) => ({
                    ...prevState,
                    pagethreenote: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-row justify-between">
        <Button
          id="prev"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => handlePageChange(e.target.id)}
        >
          上一頁
        </Button>
        <Button
          id="next"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => handlePageChange(e.target.id)}
        >
          下一頁
        </Button>
      </div>
    </div>
  );
}
