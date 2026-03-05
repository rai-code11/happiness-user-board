import React from "react";
import "../../index.css";

const UserRegistrationForm = ({
  selectedRole,
  newUser,
  onChangeNewUser,
  handleRegister,
}) => {
  return (
    <>
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
    </>
  );
};

export default UserRegistrationForm;
