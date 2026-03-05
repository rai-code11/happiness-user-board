import { useState } from "react";

export const useRegister = (setAllUsers, setDisplayedUserList, allUsers) => {
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

  const onChangeNewUser = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // 新規登録ロジックをここに追加

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

    // もし入力された項目にカンマが入っていなければ、そのままの値を返して、カンマが入っていたらカンマで区切って配列にして返す関数を作成する。

    const newUserWithArrays = (str) => {
      if (!str.trim()) return [];
      return str.split(",").map((item) => item.trim());
    };

    const registeredUser = {
      ...newUser,
      id: Date.now(),
      hobbies: newUserWithArrays(newUser.hobbies),
      studyLangs: newUserWithArrays(newUser.studyLangs),
      useLangs: newUserWithArrays(newUser.useLangs),
    };

    const newAllUsersList = [...allUsers, registeredUser];
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
