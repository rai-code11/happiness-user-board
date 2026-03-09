import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  EnrichedUsers,
  HandleSort,
  HandleTabChange,
  Mentor,
  Student,
  User,
  UserRole,
} from "../types/User";

type ReturnUseDisplay = {
  currentTab: UserRole;
  handleTabChange: HandleTabChange;
  enrichedUsers: EnrichedUsers[];
  handleSort: HandleSort;
};

export const useDisplay = (
  setSelectedRole: Dispatch<SetStateAction<UserRole>>,
  displayUserList: User[],
  setDisplayedUserList: Dispatch<SetStateAction<User[]>>,
  allUsers: User[],
): ReturnUseDisplay => {
  const [currentTab, setCurrentTab] = useState<UserRole>("all");

  // all/student/mentorに応じて表示内容を切り替えるための関数

  const roleChangeTab = (role: UserRole) => {
    setSelectedRole(role);
    const filteredUserList: User[] =
      role === "all"
        ? allUsers
        : allUsers.filter((user: User) => user.role === role);
    setDisplayedUserList(filteredUserList);
  };

  // 表示内容切り替えをした際に状態を実際に更新するための関数

  const handleTabChange: HandleTabChange = (role) => {
    setCurrentTab(role);
    roleChangeTab(role);
  };

  // 生徒：対応可能なメンター、メンター：対応可能な生徒をそれぞれ抽出するための関数

  const getMatchingUsers = (currentUser: User, allUsers: User[]) => {
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

  //既存プロパティに対応可能な生徒や対応可能なメンターなどを追加した新しいユーザー情報リスト

  const enrichedUsers: EnrichedUsers[] = displayUserList.map((user) => {
    const matchedUsers = getMatchingUsers(user, allUsers);
    const matchedNames =
      matchedUsers.length > 0
        ? matchedUsers.map((user) => user.name).join(", ")
        : "なし";
    return {
      ...user,
      displayMatchedNames: matchedNames,
    };
  });

  // 特定のプロパティを指定して、昇順、降順に並び替えるための関数

  const handleSort: HandleSort = (prop, direction) => {
    const sortedList = [...displayUserList].sort((a, b) => {
      // TypeScriptにstudent/mentorどちらの可能性もあることを伝える
      const uA = a as Student & Mentor;
      const uB = b as Student & Mentor;

      const ValA = uA[prop] ?? "";
      const ValB = uB[prop] ?? "";

      // TypeScriptに比較可能（型が揃っている）であることを伝える
      if (typeof ValA === "number" && typeof ValB === "number") {
        return direction === "asc" ? ValA - ValB : ValB - ValA;
      }
      // 数値でない場合や、型が合わない場合は0を返す
      return 0;
    });
    setDisplayedUserList(sortedList);
  };
  return { currentTab, handleTabChange, enrichedUsers, handleSort };
};
