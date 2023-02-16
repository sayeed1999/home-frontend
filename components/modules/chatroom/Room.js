import { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SingleInputForm from "../../../components/shared/SingleInputForm";
import styles from "../../../styles/Room.module.scss";
const ENDPOINT = process.env.NEXT_APP_API_URL;
const socket = io(ENDPOINT);

const Room = () => {
  const router = useRouter();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const username = (currentUser?.username || "Anonymous user").toLowerCase();
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = createRef();

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      // console.log("beforeunload event triggered");
      socket.emit("leave", { room });
      socket.off();

      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  useEffect(() => {
    if (router.asPath.includes("#")) {
      setRoom(router.asPath.split("#")[1]);
    }
  }, [router.asPath]);

  useEffect(() => {
    setMessages([]);
    if (username && room) {
      socket.emit("join", { username, room }, (error) => {
        if (error) alert(error);
      });
      return () => {
        socket.emit("leave", { room });
        socket.off();
      };
    }
  }, [username, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  });

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    socket.emit("sendMessage", newMessage, (error) => {
      if (error) return alert(error);
      setNewMessage("");
    });
  };

  const roomHeader = (
    <>
      <strong style={{ textDecoration: "underline" }}>#{room}</strong>
    </>
  );

  const messagesList = messages.map((m, i) => (
    <div
      key={i}
      className={
        m.user === "admin"
          ? styles.bot
          : m.user === username
          ? styles.self
          : styles.other
      }
    >
      <div className={styles.title}>{m.user}:</div>
      <div className={styles.body}>{m.text}</div>
    </div>
  ));

  const sendMessageBox = (
    <SingleInputForm
      state={newMessage}
      setState={setNewMessage}
      onSubmit={sendMessage}
      placeholder="Type new message here..."
    />
  );

  const componentBottom = <div ref={bottomRef} />;

  return (
    <div className={styles.room}>
      {roomHeader}
      {messagesList}
      {sendMessageBox}
      {componentBottom}
    </div>
  );
};

export default Room;
