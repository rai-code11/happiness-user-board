import { useState, type Dispatch, type SetStateAction } from "react";
import type { User } from "../types/User";

export const useRegister = (
  setAllUsers: Dispatch<SetStateAction<User[]>>,
  setDisplayedUserList: Dispatch<SetStateAction<User[]>>,
  allUsers: User[],
) => {
  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    email: "",
    age: "",
    postCode: "",
    phone: "",
    hobbies: "",
    url: "",
    studyMinutes: "",
    taskCode: "",
    studyLangs: "",
    score: "",
    experienceDays: "",
    useLangs: "",
    availableStartCode: "",
    availableEndCode: "",
  });

  // 入力された情報から1人のユーザーを作成するための関数
  const onChangeNewUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  //入力項目を必須にし、アラートを出すための関数

  const handleRegister = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    event.preventDefault();

    if (
      !newUser.name ||
      !newUser.role ||
      !newUser.email ||
      !newUser.age ||
      !newUser.postCode ||
      !newUser.phone ||
      !newUser.hobbies ||
      !newUser.url
    ) {
      alert(
        "必須項目(名前、ロール、メールアドレス、年齢、郵便番号、電話番号、趣味、URL)を入力してください",
      );
      return;
    }

    if (
      newUser.role === "student" &&
      (!newUser.studyMinutes ||
        !newUser.taskCode ||
        !newUser.studyLangs ||
        !newUser.score)
    ) {
      alert(
        "生徒の場合、勉強時間、課題番号、勉強中の言語、ハピネススコアを入力してください",
      );
      return;
    }

    if (
      newUser.role === "mentor" &&
      (!newUser.experienceDays ||
        !newUser.useLangs ||
        !newUser.availableStartCode ||
        !newUser.availableEndCode)
    ) {
      alert(
        "メンターの場合、実務経験月数、現場で使っている言語、担当できる課題番号初め、担当できる課題番号終わりを入力してください",
      );
      return;
    }

    // 入力された値を配列に変換するための関数

    const newUserWithArrays = (str: string) => {
      if (!str.trim()) return [];
      return str.split(",").map((item) => item.trim());
    };

    // 共通項目を作成する

    const common = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      age: Number(newUser.age),
      postCode: newUser.postCode,
      phone: newUser.phone,
      hobbies: newUserWithArrays(newUser.hobbies),
      url: newUser.url,
    };

    // 生徒用と講師用の項目を作成する
    let registeredUser: User;

    if (newUser.role === "student") {
      registeredUser = {
        ...common,
        role: "student",
        studyMinutes: Number(newUser.studyMinutes),
        taskCode: Number(newUser.taskCode),
        studyLangs: newUserWithArrays(newUser.studyLangs),
        score: Number(newUser.score),
      };
    } else if (newUser.role === "mentor") {
      registeredUser = {
        ...common,
        role: "mentor",
        experienceDays: Number(newUser.experienceDays),
        useLangs: newUserWithArrays(newUser.useLangs),
        availableStartCode: Number(newUser.availableStartCode),
        availableEndCode: Number(newUser.availableEndCode),
      };
    } else {
      return;
    }

    // ユーザー登録後の全ユーザーの配列

    const newAllUsersList: User[] = [...allUsers, registeredUser];
    setAllUsers(newAllUsersList);
    setDisplayedUserList(newAllUsersList);

    setNewUser({
      name: "",
      role: "",
      email: "",
      age: "",
      postCode: "",
      phone: "",
      hobbies: "",
      url: "",
      studyMinutes: "",
      taskCode: "",
      studyLangs: "",
      score: "",
      experienceDays: "",
      useLangs: "",
      availableStartCode: "",
      availableEndCode: "",
    });
  };
  return { newUser, onChangeNewUser, handleRegister };
};
