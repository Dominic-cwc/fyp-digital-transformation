import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [checkedItems, setCheckedItems] = useState([]);
  const [decc8, setDecc8] = useState(false);
  const [decc4, setDecc4] = useState(false);
  const [decc5, setDecc5] = useState(false);

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

  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);

  return (
    <div
      id="甲部"
      className="text-sm  md:text-base border-solid border-2 border-gray-900 w-10/12"
    >
      <div className="title mb-2">甲部：活動 ∕ 小組一般資料</div>
      <div>
        <div className="flex flex-row">
          <Label htmlFor="name" className="text-sm  md:text-base">
            活動名稱：
          </Label>
          <Input
            id="name"
            className="focus:ring-gray-400 w-1/2 ml-2 h-8"
            required
            type="text"
          />
        </div>
        <div className=" mt-1 flex flex-row">
          <Label htmlFor="eventtypes" className="text-sm md:text-base w-2/12">
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
            />
          </div>
        ) : null}

        {decc5 ? (
          <div className="flex flex-row mt-1">
            <Label htmlFor="decc5" className="text-sm  md:text-base">
              減輕護老壓力 DECC 5/NEC 5：
            </Label>
            <Input
              id="decc5"
              className="focus:ring-gray-400 w-1/2 ml-2 h-8"
              required
              type="text"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
