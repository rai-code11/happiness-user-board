import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
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
                  ? "border-b-2 border-blue-500 text-blue-600" // 選ばれている時
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700" // 選ばれていない時
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

      {/* 混在エリア */}
      <div className="container mx-auto">
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
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
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
                  <td className="px-6 py-4 text-right">
                    {user?.experienceDays}
                  </td>
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

        {selectedRole === "all" ? null : (
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm mt-4">
            <div className="flex flex-wrap gap-6">
              {(selectedRole === "student"
                ? [
                    { label: "勉強時間", prop: "studyMinutes" },
                    { label: "ハピネススコア", prop: "score" },
                  ]
                : [{ label: "実務経験月数", prop: "experienceDays" }]
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

        {selectedRole === "all" && (
          <div className="bg-white p-8 rounded-2xl shadow-md border-gray-200 max-w-4xl mt-4">
            <p className="text-lg font-bold text-gray-800 mb-6">
              ユーザー新規登録
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* --- 共通項目セクション --- */}
              <section>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  共通必須項目
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ロール選択 */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="roleForm"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      ロール <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="roleForm"
                      name="role"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={newUser.role}
                      onChange={onChangeNewUser}
                    >
                      <option value="">ロールを選択してください</option>
                      <option value="student">生徒</option>
                      <option value="mentor">メンター</option>
                    </select>
                  </div>

                  {/* 名前 */}
                  <div>
                    <label
                      htmlFor="nameForm"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      名前<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nameForm"
                      name="name"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newUser.name}
                      onChange={onChangeNewUser}
                    />
                  </div>

                  {/* メールアドレス */}
                  <div>
                    <label
                      htmlFor="exampleInputEmail1"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      メールアドレス<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="exampleInputEmail1"
                      name="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newUser.email}
                      onChange={onChangeNewUser}
                    />
                  </div>

                  {/* 年齢・郵便番号・電話番号 */}
                  <div className="grid grid-cols-3 gap-2 md:col-span-2">
                    <div>
                      <label
                        htmlFor="ageForm"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        年齢<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="ageForm"
                        name="age"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                        value={newUser.age}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postCodeForm"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        郵便番号<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="postCodeForm"
                        name="postCode"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                        value={newUser.postCode}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phoneForm"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                      >
                        電話番号<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phoneForm"
                        name="phone"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                        value={newUser.phone}
                        onChange={onChangeNewUser}
                      />
                    </div>
                  </div>

                  {/* 趣味 */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="hobbyForm"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      趣味（カンマ区切り）
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="hobbyForm"
                      name="hobbies"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                      value={newUser.hobbies}
                      onChange={onChangeNewUser}
                    />
                  </div>

                  {/* URL */}
                  <div className="md:col-span-2">
                    <label
                      htmlFor="exampleInputUrl"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      URL<span className="text-red-500">*</span>
                    </label>
                    <input
                      id="exampleInputUrl"
                      name="url"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                      value={newUser.url}
                      onChange={onChangeNewUser}
                    />
                  </div>
                </div>
              </section>

              {/* --- 生徒のみ必須セクション --- */}
              {newUser.role === "student" && (
                <section className="p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-4">
                  <p className="text-sm font-bold text-blue-800 mb-4 flex items-center">
                    <span className="bg-blue-200 p-1 rounded mr-2">🎓</span>
                    生徒用必須項目
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="studyMinutesForm"
                        className="block text-sm font-semibold text-blue-700 mb-1"
                      >
                        勉強時間<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="studyMinutesForm"
                        name="studyMinutes"
                        type="text"
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.studyMinutes}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="taskCodeForm"
                        className="block text-sm font-semibold text-blue-700 mb-1"
                      >
                        課題番号<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="taskCodeForm"
                        name="taskCode"
                        type="text"
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.taskCode}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="studyLangsForm"
                        className="block text-sm font-semibold text-blue-700 mb-1"
                      >
                        勉強中の言語<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="studyLangsForm"
                        name="studyLangs"
                        type="text"
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.studyLangs}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="scoreForm"
                        className="block text-sm font-semibold text-blue-700 mb-1"
                      >
                        ハピネススコア<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="scoreForm"
                        name="score"
                        type="text"
                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.score}
                        onChange={onChangeNewUser}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* --- メンターのみ必須セクション --- */}
              {newUser.role === "mentor" && (
                <section className="p-6 bg-purple-50 rounded-2xl border border-purple-100 animate-in fade-in slide-in-from-top-4">
                  <p className="text-sm font-bold text-purple-800 mb-4 flex items-center">
                    <span className="bg-purple-200 p-1 rounded mr-2">👨‍🏫</span>
                    メンター用必須項目
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="experienceMonthsForm"
                        className="block text-sm font-semibold text-purple-700 mb-1"
                      >
                        実務経験月数<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="experienceMonthsForm"
                        name="experienceDays"
                        type="text"
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.experienceDays}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="languageForm"
                        className="block text-sm font-semibold text-purple-700 mb-1"
                      >
                        現場で使っている言語
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="languageForm"
                        name="useLangs"
                        type="text"
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.useLangs}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="availableStartCodeForm"
                        className="block text-sm font-semibold text-purple-700 mb-1"
                      >
                        担当課題(初め)<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="availableStartCodeForm"
                        name="availableStartCode"
                        type="text"
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.availableStartCode}
                        onChange={onChangeNewUser}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="availableEndCodeForm"
                        className="block text-sm font-semibold text-purple-700 mb-1"
                      >
                        担当課題(終わり)<span className="text-red-500">*</span>
                      </label>
                      <input
                        id="availableEndCodeForm"
                        name="availableEndCode"
                        type="text"
                        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newUser.availableEndCode}
                        onChange={onChangeNewUser}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* 登録ボタン */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-100"
                onClick={(e) => handleRegister(e)}
              >
                登録する
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
