import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";

export default function ReviewProposal({
  proposalContent,
  setSelectedProposal,
  role,
  setSubmittedComment,
  username,
}) {
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
  const [deptmanagerComment, setDeptmanagerComment] = useState("");
  const [centermanagerComment, setCentermanagerComment] = useState("");
  const [proposalStatus, setProposalStatus] = useState("");
  const [clickedSubmit, setClickedSubmit] = useState(false);
  const [abletosubmit, setAbletosubmit] = useState(true);

  const getInputs = (type) => {
    if (type == "舉辦日期") {
      return proposalContent.eventDate;
    } else if (type == "逢星期") {
      return proposalContent.eventWeek;
    } else if (type == "舉辦時間") {
      return proposalContent.eventTime;
    } else if (type == "節數") {
      return proposalContent.eventNum;
    } else if (type == "地點") {
      return proposalContent.eventLocation;
    } else if (type == "對象") {
      return proposalContent.eventTarget;
    } else if (type == "名額") {
      return proposalContent.eventQuota;
    } else if (type == "費用") {
      return proposalContent.eventFee;
    } else if (type == "導師姓名") {
      return proposalContent.eventTutor;
    } else if (type == "工作員人數") {
      return proposalContent.eventStaffNum;
    }
  };

  const handlePageChange = (type) => {
    if (type == "prev" && page > 1) {
      setPage(page - 1);
    } else if (type == "next" && page < 3) {
      setPage(page + 1);
    }
  };

  const handleInputCheck = () => {
    if (proposalStatus == "" && role == "centermanager") {
      return false;
    }
    if (role == "deptmanager" && deptmanagerComment == "") {
      return false;
    }
    return true;
  };

  const submitProposalComment = () => {
    if (handleInputCheck()) {
      axios
        .post("/api/submitProposalComment", {
          deptmanagerComment: deptmanagerComment,
          centermanagerComment: centermanagerComment,
          proposalStatus: proposalStatus,
          proposalID: proposalContent._id,
          role: role,
          centerManager_username: proposalContent.centermanager.username,
        })
        .then((res) => {
          alert("提交成功");
          if (role == "deptmanager") {
            axios.post("/api/sendNotification", {
              receiver: proposalContent.centermanager.username,
              title: "查看/審核: 新的提案",
              content: `${proposalContent.deptmanager.personalname} 轉遞了一個由${proposalContent.createdby.personalname}建立的新提案 "${proposalContent.eventName}" 給您，請盡快查看並審核。`,
              checked: false,
              flag: "red",
              forUser: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (role == "centermanager" && proposalStatus == "approved") {
        axios
          .post("/api/createEvent", {
            eventName: proposalContent.eventName,
            eventTypes: proposalContent.eventTypes,
            eventDate: proposalContent.eventDate,
            eventWeek: proposalContent.eventWeek,
            eventTime: proposalContent.eventTime,
            eventNum: proposalContent.eventNum,
            eventLocation: proposalContent.eventLocation,
            eventTarget: proposalContent.eventTarget,
            eventQuota: proposalContent.eventQuota,
            eventFee: proposalContent.eventFee,
            eventpurpose: proposalContent.eventpurpose,
          })
          .then(() => {
            axios
              .post("/api/sendNotification", {
                receiver: proposalContent.createdby.username,
                title: "回覆: 提案: " + proposalContent.eventName,
                content: `${proposalContent.centermanager.personalname} 已經批准您的提案 "${proposalContent.eventName}" 並新增了這個活動。`,
                checked: false,
                flag: "blue",
                forUser: false,
              })
              .error((err) => {
                console.log(err);
              });

            axios
              .post("/api/sendNotification", {
                receiver: null,
                title: "新增活動: " + proposalContent.eventName,
                content: `新活動 "${proposalContent.eventName}" 開始接受報名。`,
                checked: false,
                flag: "none",
                forUser: true,
              })
              .error((err) => {
                console.log(err);
              });
          });
      } else if (role == "centermanager" && proposalStatus == "rejected") {
        axios.post("/api/sendNotification", {
          receiver: proposalContent.createdby.username,
          title: "回覆: 提案: " + proposalContent.eventName,
          content: `${proposalContent.centermanager.personalname} 已經拒絕了您的提案 "${proposalContent.eventName}"。`,
          checked: false,
          flag: "red",
        });
      }

      setSubmittedComment(true);
      setSelectedProposal(null);
    } else {
      setAbletosubmit(false);
    }
  };

  return (
    <div>
      {clickedSubmit ? (
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
                  {}

                  <div className="mb-5">
                    {role == "deptmanager"
                      ? "確認傳送給中心主任"
                      : role == "centermanager"
                      ? "確認提交意見"
                      : null}
                    ?
                  </div>
                  <div className="flex flex-row">
                    <Button
                      className="bg-gray-400 transition-all duration-300 ease-in-out hover:bg-green-400"
                      onClick={() => {
                        setClickedSubmit(false);
                        submitProposalComment();
                      }}
                    >
                      確定
                    </Button>
                    <Button
                      className="bg-gray-400 transition-all duration-300 ease-in-out hover:bg-red-400 ml-2"
                      onClick={() => setClickedSubmit(false)}
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
            setSelectedProposal(null);
          }}
        >
          返回
        </Button>
        {proposalContent.status == "pending" &&
        role == "deptmanager" &&
        proposalContent.currentReviewer == username ? (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setClickedSubmit(true);
            }}
          >
            傳送給中心主任
          </Button>
        ) : null}

        {role == "deptmanager" &&
        proposalContent.currentReviewer ==
          proposalContent.centermanager.username ? (
          <Label className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded flex justify-center items-center">
            已傳送給中心經理
          </Label>
        ) : null}

        {proposalContent.status == "pending" && role == "centermanager" ? (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setClickedSubmit(true);
            }}
          >
            提交意見
          </Button>
        ) : null}

        {proposalContent.status == "approved" && role == "staff" ? (
          <Label className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded flex justify-center items-center">
            已通過並新增此活動
          </Label>
        ) : null}

        {proposalContent.status == "rejected" && role == "staff" ? (
          <Label className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded flex justify-center items-center">
            已被拒絕
          </Label>
        ) : null}
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <div className="flex flex-row">
            <Label htmlFor="deptmanager" className="text-sm  md:text-base">
              致部門經理：
            </Label>
            <Select>
              <SelectTrigger className="focus:ring-gray-400 w-40 mb-2">
                <SelectValue
                  placeholder={proposalContent.deptmanager.personalname}
                />
              </SelectTrigger>
            </Select>
          </div>
          <div className="flex flex-row">
            <Label htmlFor="centermanager" className="text-sm  md:text-base">
              致中心經理：
            </Label>
            <Select>
              <SelectTrigger className="focus:ring-gray-400 w-40 mb-2">
                <SelectValue
                  placeholder={proposalContent.centermanager.personalname}
                />
              </SelectTrigger>
            </Select>
          </div>
        </div>
        <div className="flex flex-row">
          <Label htmlFor="createdTime" className="text-sm  md:text-base">
            提案建立時間：
          </Label>
          <span className="text-sm  md:text-base">
            {new Date(proposalContent.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      {!abletosubmit ? (
        <div className="text-red-500">請填寫所有帶有*的資料</div>
      ) : null}
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
                value={proposalContent.eventName}
                readOnly
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
                          checked={proposalContent.eventTypes.includes(item)}
                          readOnly
                        />
                      </td>
                      <td className="text-sm  md:text-base">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {proposalContent.decc8 != "" ? (
              <div className="flex flex-row mt-1">
                <Label htmlFor="decc8" className="text-sm  md:text-base">
                  支援培訓活動 DECC 8：
                </Label>
                <Input
                  id="decc8"
                  className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                  required
                  type="text"
                  value={proposalContent.decc8}
                  readOnly
                />
              </div>
            ) : null}

            {proposalContent.decc4 != "" ? (
              <div className="flex flex-row mt-1">
                <Label htmlFor="decc4" className="text-sm  md:text-base">
                  長者會員協助策劃及推行 DECC 4/NEC 4 ：
                </Label>
                <Input
                  id="decc4"
                  className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                  required
                  type="text"
                  value={proposalContent.decc4}
                  readOnly
                />
              </div>
            ) : null}

            {proposalContent.decc5 != "" ? (
              <div className="flex flex-row mt-1 mb-1">
                <Label htmlFor="decc5" className="text-sm  md:text-base">
                  減輕護老壓力 DECC 5/NEC 5 ：
                </Label>
                <Input
                  id="decc5"
                  className="focus:ring-gray-400 w-1/2 ml-2 h-8"
                  required
                  type="text"
                  value={proposalContent.decc5}
                  readOnly
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
                        className="focus:ring-gray-400 ml-2 w-1/6 h-8"
                        required
                        type="text"
                        value={proposalContent.eventVolunteerElderlyNum}
                        readOnly
                      />
                      <Label
                        htmlFor="othersnum"
                        className="text-sm ml-2 md:text-base"
                      >
                        其他
                      </Label>
                      <Input
                        id="othersnum"
                        className="focus:ring-gray-400 ml-2 w-1/6 h-8"
                        required
                        type="text"
                        value={proposalContent.eventVolunteerOthersNum}
                        readOnly
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
                        checked={proposalContent.eventApplicant.member}
                        readOnly
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
                        checked={proposalContent.eventApplicant.nonmember}
                        readOnly
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
                        checked={proposalContent.eventApplicant.others}
                        readOnly
                      />
                      <Label
                        htmlFor="others"
                        className="mt-1 text-sm  md:text-base"
                      >
                        其他
                      </Label>
                      <Input
                        id="othersname"
                        className="focus:ring-gray-400 ml-2 md:w-1/4 w-1/6 h-8"
                        required
                        type="text"
                        value={proposalContent.eventApplicant.othersname}
                        readOnly
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
                        readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
                readOnly
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
      {role == "deptmanager" ? (
        <div className="flex flex-row">
          <Label htmlFor="deptmanagerComment" className="text-sm  md:text-base">
            部門主任/督導意見：<span className="text-red-500">*</span>
          </Label>
          {proposalContent.status == "pending" ? (
            <textarea
              id="deptmanagerComment"
              className="ring-2 ring-gray-400 ml-10 w-1/4 mb-2 h-32"
              required
              type="text"
              value={deptmanagerComment}
              onChange={(e) => setDeptmanagerComment(e.target.value)}
            />
          ) : (
            <textarea
              id="centermanagerComment"
              className="ring-2 ring-gray-400 ml-10 w-1/4 mb-2 h-32"
              required
              type="text"
              value={proposalContent.deptcomment}
              readOnly
            />
          )}
        </div>
      ) : null}
      {role == "centermanager" ? (
        <div className="flex flex-row">
          <Label
            htmlFor="centermanagerComment"
            className="text-sm  md:text-base"
          >
            中心主任/服務督導/服務總監/總部經理意見:
          </Label>

          {proposalContent.status == "pending" ? (
            <textarea
              id="centermanagerComment"
              className="ring-2 ring-gray-400 ml-10 w-1/4 mb-2 h-32"
              required
              type="text"
              value={centermanagerComment}
              onChange={(e) => setCentermanagerComment(e.target.value)}
            />
          ) : (
            <textarea
              id="centermanagerComment"
              className="ring-2 ring-gray-400 ml-10 w-1/4 mb-2 h-32"
              required
              type="text"
              value={proposalContent.centercomment}
              readOnly
            />
          )}

          <Label
            htmlFor="proposalStatus"
            className="text-sm  md:text-base ml-10"
          >
            接受/拒絕提案<span className="text-red-500">*</span>:
          </Label>
          {proposalContent.status == "pending" ? (
            <Select
              onValueChange={(value) => {
                setProposalStatus(value);
              }}
            >
              <SelectTrigger className="focus:ring-gray-400 w-1/4 ml-4 mb-2">
                <SelectValue placeholder="選擇同意或拒絕提案" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="hover:bg-green-200" value="approved">
                    同意
                  </SelectItem>
                  <SelectItem className="hover:bg-red-200" value="rejected">
                    拒絕
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Select>
              <SelectTrigger className="focus:ring-gray-400 w-1/4 ml-4 mb-2">
                <SelectValue
                  placeholder={
                    proposalContent.status == "approved" ? "同意" : "拒絕"
                  }
                />
              </SelectTrigger>
            </Select>
          )}
        </div>
      ) : null}

      {role == "staff" ? (
        <div className="flex flex-row">
          <Label htmlFor="deptmanagerComment" className="text-sm  md:text-base">
            部門主任/督導意見：
          </Label>
          <textarea
            id="deptmanagerComment"
            className="ring-2 ring-gray-400 ml-5 w-1/4 mb-2 h-32"
            required
            type="text"
            value={
              proposalContent.deptcomment == ""
                ? "還沒新增意見"
                : proposalContent.deptcomment
            }
            readOnly
          />
          <Label
            htmlFor="centermanagerComment"
            className="text-sm  md:text-base ml-2"
          >
            中心主任/服務督導/服務總監/總部經理意見:
          </Label>
          <textarea
            id="centermanagerComment"
            className="ring-2 ring-gray-400 ml-5 w-1/4 mb-2 h-32"
            type="text"
            value={
              /^\s*$/.test(proposalContent.centercomment) ||
              proposalContent.centercomment == ""
                ? "還沒新增意見"
                : proposalContent.centercomment
            }
            readOnly
          />
        </div>
      ) : null}
    </div>
  );
}
