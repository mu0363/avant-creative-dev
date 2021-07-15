import * as yup from "yup";

//参考記事
//https://qiita.com/shin_k_2281/items/00174a6b754f31de9f37
//https://zenn.dev/tsuboi/articles/77f9ae4ab9e57f
//https://www.youtube.com/watch?v=UvH70UkbyfE

const REQUIRE_MSG = "必須入力項目です";
const VIOLATION_EMAIL = "正しい形式で入力してください";

export const resetEmailSchema = yup.object().shape({
  email: yup.string().required(REQUIRE_MSG).email(VIOLATION_EMAIL),
});
