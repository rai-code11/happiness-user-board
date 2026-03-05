import { useState } from "react";

export const useDisplay = (
  setSelectedRole,
  displayUserList,
  setDisplayedUserList,
  allUsers,
) => {
  const [currentTab, setCurrentTab] = useState("all"); //D

  const RoleChangeTab = (role) => {
    setSelectedRole(role);
    const filteredUserList =
      role === "all" ? allUsers : allUsers.filter((user) => user.role === role);
    setDisplayedUserList(filteredUserList);
  };

  const handleTabChange = (role) => {
    setCurrentTab(role); // 見た目の切り替え用
    RoleChangeTab(role); // 実際のフィルタリング処理用
  };

  // mentorの対応できる課題番号の初めと終わりの間にstudentの課題番号が入っていたら、そのmentorはそのstudentの対応可能なメンターになる、みたいな機能もつける。
  // もしmentorでuser.roleがmentorであれば、対応可能な生徒は全員の中から、課題番号がmentorの対応できる課題番号の範囲内に入っているstudentを表示する、みたいな感じで。studentも同様にする。

  const getMatchingUsers = (currentUser, allUsers) => {
    if (currentUser.role === "student") {
      return allUsers.filter(
        (user) =>
          user.role === "mentor" &&
          currentUser.taskCode >= user.availableStartCode &&
          currentUser.taskCode <= user.availableEndCode,
      );
    } else if (currentUser.role === "mentor") {
      return allUsers.filter(
        (user) =>
          user.role === "student" &&
          user.taskCode >= currentUser.availableStartCode &&
          user.taskCode <= currentUser.availableEndCode,
      );
    }
    return [];
  };

  const enrichedUsers = displayUserList.map((user) => {
    const matchedUsers = getMatchingUsers(user, allUsers);
    const matchedNames =
      matchedUsers.length > 0
        ? matchedUsers.map((user) => user.name).join(", ")
        : "なし";
    return {
      ...user,
      displayMatchedNames: matchedNames,
      // ロールに応じたラベルなどもここで決めておける
    };
  });

  const handleSort = (prop, direction) => {
    const sortedList = [...displayUserList].sort((a, b) => {
      return direction === "asc" ? a[prop] - b[prop] : b[prop] - a[prop];
    });
    setDisplayedUserList(sortedList);
  };
  return { currentTab, handleTabChange, enrichedUsers, handleSort };
};
