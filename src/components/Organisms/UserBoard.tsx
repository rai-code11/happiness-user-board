import React from "react";
import "../../index.css";

const UserBoard = ({ enrichedUsers }) => {
  return (
    <>
      {" "}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold bg-gray-100">
                名前
              </th>
              <th scope="col" className="px-6 py-3">
                ロール
              </th>
              <th scope="col" className="px-6 py-3">
                メールアドレス
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                年齢
              </th>
              <th scope="col" className="px-6 py-3">
                郵便番号
              </th>
              <th scope="col" className="px-6 py-3">
                電話番号
              </th>
              <th scope="col" className="px-6 py-3">
                趣味
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                勉強時間
              </th>
              <th scope="col" className="px-6 py-3">
                課題番号
              </th>
              <th scope="col" className="px-6 py-3">
                勉強中の言語
              </th>
              <th scope="col" className="px-6 py-3 text-right font-bold">
                ハピネススコア
              </th>
              <th scope="col" className="px-6 py-3">
                対応可能なメンター
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                実務経験月数
              </th>
              <th scope="col" className="px-6 py-3">
                現場で使っている言語
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                開始課題
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                終了課題
              </th>
              <th scope="col" className="px-6 py-3">
                対応可能な生徒
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {enrichedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50/50"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === "mentor"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 lowercase text-blue-600 underline">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-right">{user.age}</td>
                <td className="px-6 py-4">{user.postCode}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 max-w-xs truncate">
                  {user.hobbies.join(", ")}
                </td>
                <td className="px-6 py-4">{user.url}</td>
                <td className="px-6 py-4 text-right font-mono">
                  {user?.studyMinutes}
                </td>
                <td className="px-6 py-4 text-center">{user?.taskCode}</td>
                <td className="px-6 py-4">{user?.studyLangs?.join(", ")}</td>
                <td className="px-6 py-4 text-right font-bold text-orange-600">
                  {user?.score}
                </td>
                <td className="px-6 py-4 text-sm italic">
                  {user.role === "student" ? user.displayMatchedNames : "-"}
                </td>
                <td className="px-6 py-4 text-right">{user?.experienceDays}</td>
                <td className="px-6 py-4">{user?.useLangs?.join(", ")}</td>
                <td className="px-6 py-4 text-center">
                  {user?.availableStartCode}
                </td>
                <td className="px-6 py-4 text-center">
                  {user?.availableEndCode}
                </td>
                <td className="px-6 py-4 text-sm italic">
                  {user.role === "mentor" ? user.displayMatchedNames : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserBoard;
