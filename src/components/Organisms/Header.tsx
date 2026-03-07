import "../../index.css";
import type { HandleTabChange, UserRole } from "../../types/User";

const Header = ({
  handleTabChange,
  currentTab,
}: {
  handleTabChange: HandleTabChange;
  currentTab: UserRole;
}) => {
  return (
    <>
      <div className="container mx-atuo">
        <div className="text-lg font-bold text-gray-800 ">
          ユーザー管理ページ
        </div>
      </div>
      <ul className="flex justify-center space-x-8 border-b border-gray-200 bg-amber-400 pt-2.5">
        {["all", "student", "mentor"].map((role) => (
          <li key={role}>
            <button
              onClick={() => handleTabChange(role)}
              className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 ${
                currentTab === role
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {role === "all"
                ? "全員"
                : role === "student"
                  ? "生徒のみ"
                  : "メンターのみ"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Header;
