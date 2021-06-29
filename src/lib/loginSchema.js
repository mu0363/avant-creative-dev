import * as yup from "yup";

//参考記事
//https://qiita.com/shin_k_2281/items/00174a6b754f31de9f37
//https://zenn.dev/tsuboi/articles/77f9ae4ab9e57f
//https://www.youtube.com/watch?v=UvH70UkbyfE

const REQUIRE_MSG = "必須入力項目です";
const VIOLATION_EMAIL = "正しい形式で入力してください";
const VIOLATION_PASSWORD_LOWERCASE = "小文字を含めてください";
const VIOLATION_PASSWORD_UPPERCASE = "大文字を含めてください";
const VIOLATION_PASSWORD_NUMBER = "数字を含めてください";
const VIOLATION_PASSWORD_MIN_COUNT = "パスワードは8文字以上で入力してください";
const VIOLATION_PASSWORD_MAX_COUNT = "パスワードは40文字以下で入力してください";

export const loginSchema = yup.object().shape({
  email: yup.string().required(REQUIRE_MSG).email(VIOLATION_EMAIL),
  password: yup
    .string()
    .required(REQUIRE_MSG)
    .matches(/(?=.*[a-z])/, VIOLATION_PASSWORD_LOWERCASE)
    .matches(/(?=.*[A-Z])/, VIOLATION_PASSWORD_UPPERCASE)
    .matches(/(?=.*[0-9])/, VIOLATION_PASSWORD_NUMBER)
    .min(8, VIOLATION_PASSWORD_MIN_COUNT)
    .max(40, VIOLATION_PASSWORD_MAX_COUNT),
});
