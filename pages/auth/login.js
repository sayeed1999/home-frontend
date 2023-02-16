import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Button from "../../components/shared/Button";
import EmailInput from "../../components/shared/EmailInput";
import Form from "../../components/shared/Form";
import PasswordInput from "../../components/shared/PasswordInput";
import AppMsgs from "../../constants/AppMsgs";
import AppRoutes from "../../constants/AppRoutes";
import { useLoginMutation } from "../../rtk/features/authSlice";
import { setUser } from "../../utils/services/storage.service";

const Login = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading, isSuccess, isError, data }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // console.log(data, isLoading, isError, isSuccess);
    if (data && isSuccess && !isLoading) {
      swal({
        title: "Success",
        text: AppMsgs.LoggedIn,
        icon: "success",
      });
      setUser(data.data);
      push(AppRoutes.Chatroom);
    }
  }, [data, isLoading, isError, isSuccess]);

  const submit = async () => {
    if (!email || !password) {
      return swal("Warning", AppMsgs.RequiredFieldsEmpty, "warning");
    }
    await login({ email, password });
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
