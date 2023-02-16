import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Button from "../../components/shared/Button";
import CheckBoxInput from "../../components/shared/CheckBoxInput";
import EmailInput from "../../components/shared/EmailInput";
import Form from "../../components/shared/Form";
import PasswordInput from "../../components/shared/PasswordInput";
import TextInput from "../../components/shared/TextInput";
import AppMsgs from "../../constants/AppMsgs";
import AppRoutes from "../../constants/AppRoutes";
import { resetStatus, signup } from "../../store/reducers/authReducer";

const Signup = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const { push } = useRouter();

  useEffect(() => {
    if (authStatus === "succeeded") {
      swal({
        title: "Success",
        text: AppMsgs.SignedUp,
        icon: "success",
      });
      push(AppRoutes.Login);
    }
    dispatch(resetStatus());
  }, [authStatus]);

  const submit = () => {
    if (!username || !email || !password || !confirmPassword || !agree) {
      swal("Warning", AppMsgs.RequiredFieldsEmpty, "warning");
      return;
    }
    if (password !== confirmPassword) {
      swal("Warning", "Password & confirm password don't match", "warning");
      return;
    }
    dispatch(signup({ email, password, username }));
  };

  return (
    <>
      <h1 style={{ fontWeight: "400" }}> Create an account.. </h1>
      <Form className="signup">
        <TextInput name="Username" value={username} onChange={setUsername} />
        <EmailInput name="Email" value={email} onChange={setEmail} />
        <PasswordInput
          name="Password"
          value={password}
          onChange={setPassword}
        />
        <PasswordInput
          name="Confirm Password"
          value={confirmPassword}
          onChange={setConfirPassword}
        />
        <CheckBoxInput value={agree} onChange={setAgree}>
          I agree to the terms &apos; conditions
        </CheckBoxInput>
        <Button onClick={submit} block={true}>
          Submit
        </Button>
        <p className="form-text text-center">
          Already have an account? <Link href={AppRoutes.Login}>Login</Link>{" "}
          instead.
        </p>
      </Form>
    </>
  );
};

export default Signup;
