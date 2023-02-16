import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Button from "../../components/shared/Button";
import CheckBoxInput from "../../components/shared/CheckBoxInput";
import EmailInput from "../../components/shared/EmailInput";
import Form from "../../components/shared/Form";
import PasswordInput from "../../components/shared/PasswordInput";
import TextInput from "../../components/shared/TextInput";
import AppMsgs from "../../constants/AppMsgs";
import AppRoutes from "../../constants/AppRoutes";
import { useRegisterMutation } from "../../rtk/features/authSlice";
import { setUser } from "../../utils/services/storage.service";

const Signup = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [register, { data, isLoading, isError, isSuccess }] =
    useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirPassword] = useState("");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // console.log(data, isLoading, isError, isSuccess);
    if (data && isSuccess && !isLoading) {
      swal({
        title: "Success",
        text: AppMsgs.SignedUp,
        icon: "success",
      });
      setUser(data.data);
      push(AppRoutes.Chatroom);
    }
  }, [data, isLoading, isError, isSuccess]);

  const submit = async () => {
    if (!name || !email || !password || !agree) {
      swal("Warning", AppMsgs.RequiredFieldsEmpty, "warning");
      return;
    }
    // if (password !== confirmPassword) {
    //   swal("Warning", "Password & confirm password don't match", "warning");
    //   return;
    // }
    await register({ name, email, password });
  };

  return (
    <>
      <h1 style={{ fontWeight: "400" }}> Create an account.. </h1>
      <Form className="signup">
        <TextInput name="Full name" value={name} onChange={setName} />
        <EmailInput name="Email" value={email} onChange={setEmail} />
        <PasswordInput
          name="Password"
          value={password}
          onChange={setPassword}
        />
        {/* <PasswordInput
          name="Confirm Password"
          value={confirmPassword}
          onChange={setConfirPassword}
        /> */}
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
