import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Organisms/Header";
import UserBoard from "./components/Organisms/UserBoard";
import AscDescControl from "./components/Organisms/AscDescControl";
import UserRegistrationForm from "./components/Organisms/UserRegistrationForm";
import { useDisplay } from "./hooks/useDisplay";
import { useRegister } from "./hooks/useRegister";
import type { UserRole } from "./types/User";

type BaseUser = {
  id: number;
  name: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
};

type Student = BaseUser & {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
};

type Mentor = BaseUser & {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
};

type User = Student | Mentor;

const USER_LIST: User[] = [
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
  const [selectedRole, setSelectedRole] = useState<UserRole>("all");
  const [displayUserList, setDisplayedUserList] = useState(USER_LIST);
  const [allUsers, setAllUsers] = useState(USER_LIST);

  const { currentTab, handleTabChange, enrichedUsers, handleSort } = useDisplay(
    setSelectedRole,
    displayUserList,
    setDisplayedUserList,
    allUsers,
  );

  const { newUser, onChangeNewUser, handleRegister } = useRegister(
    setAllUsers,
    setDisplayedUserList,
    allUsers,
  );

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
