import "../../index.css";
import type { AscDescControlType } from "../../types/User";

const AscDescControl = ({ selectedRole, handleSort }: AscDescControlType) => {
  return (
    <>
      {" "}
      {selectedRole === "all" ? null : (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm mt-4">
          <div className="flex flex-wrap gap-6">
            {(selectedRole === "student"
              ? ([
                  { label: "勉強時間", prop: "studyMinutes" },
                  { label: "ハピネススコア", prop: "score" },
                ] as const)
              : ([{ label: "実務経験月数", prop: "experienceDays" }] as const)
            ).map((item) => (
              <div key={item.prop} className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-gray-600 ml-1">
                  {item.label}
                </span>
                <div className="inline-flex shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => handleSort(item.prop, "asc")}
                    className="px-4 py-1.5 text-xs font-medium bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-r border-gray-200 transition-colors"
                  >
                    昇順 ▲
                  </button>
                  <button
                    onClick={() => handleSort(item.prop, "desc")}
                    className="px-4 py-1.5 text-xs font-medium bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    降順 ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AscDescControl;
