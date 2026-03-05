import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Organisms/Header";
import UserBoard from "./components/Organisms/UserBoard";
import AscDescControl from "./components/Organisms/AscDescControl";
import UserRegistrationForm from "./components/Organisms/UserRegistrationForm";

const USER_LIST = [
  {
    id: 1,
    name: "鈴木太郎",
    role: "student",
    email: "test1@happiness.com",
    age: 26,
    postCode: "100-0003",
    phone: "0120000001",
    hobbies: ["旅行", "食べ歩き", "サーフィン"],
    url: "https://aaa.com",
    studyMinutes: 3000,
    taskCode: 101,
    studyLangs: ["Rails", "Javascript"],
    score: 68,
  },
  {
    id: 2,
    name: "鈴木二郎",
    role: "mentor",
    email: "test2@happiness.com",
    age: 31,
    postCode: "100-0005",
    phone: "0120000002",
    hobbies: ["サッカー", "ランニング", "筋トレ"],
    url: "https://bbb.com",
    experienceDays: 1850,
    useLangs: ["Next.js", "GoLang"],
    availableStartCode: 201,
    availableEndCode: 302,
  },
  {
    id: 3,
    name: "鈴木三郎",
    role: "student",
    email: "test3@happiness.com",
    age: 23,
    postCode: "300-0332",
    phone: "0120000003",
    hobbies: ["アニメ", "ゲーム", "旅行"],
    url: "https://ccc.com",
    studyMinutes: 125000,
    taskCode: 204,
    studyLangs: ["Rails", "Next.js"],
    score: 90,
  },
  {
    id: 4,
    name: "鈴木四郎",
    role: "mentor",
    email: "test4@happiness.com",
    age: 31,
    postCode: "100-0005",
    phone: "0120000004",
    hobbies: ["食べ歩き", "ランニング", "旅行"],
    url: "https://ddd.com",
    experienceDays: 260,
    useLangs: ["PHP", "Javascript"],
    availableStartCode: 103,
    availableEndCode: 408,
  },
  {
    id: 5,
    name: "鈴木五郎",
    role: "student",
    email: "test5@happiness.com",
    age: 22,
    postCode: "300-0005",
    phone: "0120000005",
    hobbies: ["筋トレ", "ランニング"],
    url: "https://eee.com",
    studyMinutes: 47800,
    taskCode: 305,
    studyLangs: ["Next.js", "Rails"],
    score: 84,
  },
  {
    id: 6,
    name: "鈴木六郎",
    role: "mentor",
    email: "test6@happiness.com",
    age: 28,
    postCode: "100-0007",
    phone: "0120000006",
    hobbies: ["ゲーム", "サッカー"],
    url: "https://fff.com",
    experienceDays: 260,
    useLangs: ["PHP", "Javascript"],
    availableStartCode: 101,
    availableEndCode: 302,
  },
  {
    id: 7,
    name: "鈴木七郎",
    role: "student",
    email: "test7@happiness.com",
    age: 24,
    postCode: "300-0008",
    phone: "0120000007",
    hobbies: ["筋トレ", "ダーツ"],
    url: "https://ggg.com",
    studyMinutes: 26900,
    taskCode: 401,
    studyLangs: ["PHP", "Rails"],
    score: 73,
  },
  {
    id: 8,
    name: "鈴木八郎",
    role: "mentor",
    email: "test8@happiness.com",
    age: 33,
    postCode: "100-0009",
    phone: "0120000008",
    hobbies: ["ランニング", "旅行"],
    url: "https://hhh.com",
    experienceDays: 6000,
    useLangs: ["Golang", "Rails"],
    availableStartCode: 301,
    availableEndCode: 505,
  },
];

function App() {
  const [selectedRole, setSelectedRole] = useState("all");
  const [allUsers, setAllUsers] = useState(USER_LIST);
  const [displayUserList, setDisplayedUserList] = useState(USER_LIST);
  const [currentTab, setCurrentTab] = useState("all");

  // 全員、生徒のみ、メンターのみのタブを用意し、選択されたタブに応じてユーザーを絞り込んで表示する
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

  // const sortByStudyMinutesAsc = () => {
  //   const newUserList = [...displayUserList];
  //   const sortedList = newUserList.sort(
  //     (a, b) => a.studyMinutes - b.studyMinutes,
  //   );
  //   setDisplayedUserList(sortedList);
  // };

  // const sortByStudyMinutesDesc = () => {
  //   const newUserList = [...displayUserList];
  //   const sortedList = newUserList.sort(
  //     (a, b) => b.studyMinutes - a.studyMinutes,
  //   );
  //   setDisplayedUserList(sortedList);
  // };

  // const sortByScoreAsc = () => {
  //   const newUserList = [...displayUserList];
  //   const sortedList = newUserList.sort((a, b) => a.score - b.score);
  //   setDisplayedUserList(sortedList);
  // };

  // const sortByScoreDesc = () => {
  //   const newUserList = [...displayUserList];
  //   const sortedList = newUserList.sort((a, b) => b.score - a.score);
  //   setDisplayedUserList(sortedList);
  // };

  // const sortByExperienceDaysAsc = () => {
  //   const newUserList = [...displayUserList];
  //   const sortedList = newUserList.sort(
  //     (a, b) => a.experienceDays - b.experienceDays,
  //   );
  //   setDisplayedUserList(sortedList);
  // };

  // const sortByExperienceDaysDesc = () => {
  //   const newUserList = [...displayUserList];
  //   const sortedList = newUserList.sort(
  //     (a, b) => b.experienceDays - a.experienceDays,
  //   );
  //   setDisplayedUserList(sortedList);
  // };

  // ↓リファクタリング

  const handleSort = (prop, direction) => {
    const sortedList = [...displayUserList].sort((a, b) => {
      return direction === "asc" ? a[prop] - b[prop] : b[prop] - a[prop];
    });
    setDisplayedUserList(sortedList);
  };

  // ユーザー新規登録フォームを作成する

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

  //新規登録フォームを用意し、ユーザーを新規で作成するようにする。

  // もし入力したロールがsutudentであれば、特定の項目を入力必須にする、mentorの場合も同様にする。

  return (
    <>
      <Header handleTabChange={handleTabChange} currentTab={currentTab} />

      {/* 混在エリア */}
      <div className="container mx-auto">
        <UserBoard enrichedUsers={enrichedUsers} />

        <AscDescControl selectedRole={selectedRole} handleSort={handleSort} />
        <UserRegistrationForm
          selectedRole={selectedRole}
          newUser={newUser}
          onChangeNewUser={onChangeNewUser}
          handleRegister={handleRegister}
        />
      </div>
    </>
  );
}

export default App;
