import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Button from "../../components/shared/Button";
import EmailInput from "../../components/shared/EmailInput";
import Form from "../../components/shared/Form";
import PasswordInput from "../../components/shared/PasswordInput";
import AppMsgs from "../../constants/AppMsgs";
import AppRoutes from "../../constants/AppRoutes";
import { login, resetStatus } from "../../store/reducers/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  useEffect(() => {
    if (authStatus === "succeeded") {
      // swal is firing on app reload due to getting auth valid token
      swal({
        title: "Success",
        text: AppMsgs.LoggedIn,
        icon: "success",
      });
      push(AppRoutes.Newsfeed);
    }

    dispatch(resetStatus());
  }, [authStatus]);

  const submit = () => {
    if (!email || !password) {
      return swal("Warning", AppMsgs.RequiredFieldsEmpty, "warning");
    }
    dispatch(login({ email, password }));
  };

  return (
    <>
      <h2 style={{ fontWeight: "400" }}> Login to your account.. </h2>
      <Form className="login">
        <EmailInput name="Email" value={email} onChange={setEmail} />
        <PasswordInput
          name="Password"
          value={password}
          onChange={setPassword}
        />
        <Button onClick={() => submit()} block={true}>
          Submit
        </Button>
        <p className="form-text text-center">
          Don&apos;t have an account?{" "}
          <Link href={AppRoutes.Signup}>Signup</Link> instead.
        </p>
      </Form>
    </>
  );
};

export default Login;
