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

export type Student = BaseUser & {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
};

export type Mentor = BaseUser & {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
};

export type User = Student | Mentor;

export type UserRole = "all" | "student" | "mentor";

export type ReturnUseDisplay = {
  currentTab: UserRole;
  handleTabChange: HandleTabChange;
  enrichedUsers: EnrichedUsers[];
  handleSort: HandleSort;
};

export type EnrichedUsers = User & {
  displayMatchedNames: string;
};

export type HandleSort = (
  prop: keyof Student | keyof Mentor,
  direction: "asc" | "desc",
) => void;

export type AscDescControlType = {
  selectedRole: UserRole;
  handleSort: HandleSort;
};

export type HandleTabChange = (role: UserRole) => void;

export type OnChangeNewUserType = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
) => void;

// 生徒、メンターの両方で使用するプロパティ名をすべて取得
type AllPossibleKeys = keyof Student | keyof Mentor;

// 全てのプロパティ名をstring型に変換、かつroleは3項目に限定
export type UserFormState = {
  [K in AllPossibleKeys]?: string;
};
//
export type HandleRegisterType = (
  event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
) => void;

export type UserRegistrationFormProps = {
  selectedRole: UserRole;
  newUser: UserFormState;
  onChangeNewUser: OnChangeNewUserType;
  handleRegister: HandleRegisterType;
};

export type HeaderPropsType = {
  currentTab: UserRole;
  handleTabChange: HandleTabChange;
};
