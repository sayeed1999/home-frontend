import { MenuFoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/router";
import { createRef, useEffect, useState } from "react";
import Room from "../../components/modules/chatroom/Room";
import UserList from "../../components/modules/chatroom/UserList";
import AppRoutes from "../../constants/AppRoutes";
import {
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useGetMessagesWithUserQuery,
} from "../../rtk/features/chatSlice";
import styles from "../../styles/Chatroom.module.scss";
import { getUser, setChatUser } from "../../utils/services/storage.service";

const Chatroom = () => {
  const router = useRouter();
  const [to, setTo] = useState({});
  const rooms = ["help", "general", "fun"];
  const [room, setRoom] = useState(rooms[0]);
  const roomlistRef = createRef();
  const currentUser = getUser();
  const { data: chatModuleCurrentUserResponse } = useGetCurrentUserQuery();

  useEffect(() => {
    if (chatModuleCurrentUserResponse?.data) {
      setChatUser(chatModuleCurrentUserResponse?.data);
    }
  }, [chatModuleCurrentUserResponse?.data]);

  const {
    data: userList,
    isLoading,
    isError,
  } = useGetAllUsersQuery(currentUser?._id);
  const { data: conversation } = useGetMessagesWithUserQuery(to._id);

  const toggleMenu = () => {
    // toggle menu position from -150 to 0 and back
    if (roomlistRef.current.style.top !== "-200px") {
      roomlistRef.current.style.top = "-200px";
    } else {
      roomlistRef.current.style.top = "50px";
    }
  };

  const handleUserClick = async (user) => {
    setTo(user);
    router.push(`${AppRoutes.Chatroom}#user_id=${user._id.toString()}`);
  };

  const roomlist = (
    <>
      {rooms.map((r, index) => (
        <div
          key={index}
          className={styles.roomlistitem}
          onClick={() => {
            router.push(`${AppRoutes.Chatroom}#${r}`);
            toggleMenu();
          }}
        >
          #{r}
        </div>
      ))}
      <div className="text-center d-md-none">
        <Button
          type="primary"
          shape="circle"
          icon={<MenuFoldOutlined />}
          onClick={() => toggleMenu()}
        />
      </div>
    </>
  );

  return (
    <div className={`${styles.chatroom} row`}>
      <div ref={roomlistRef} className={`${styles.roomlist} col-md-2`}>
        {roomlist}
      </div>
      <div className={`${styles.room} col-md-8`}>
        <Room conversation={conversation?.data} to={to} />
      </div>
      <div ref={roomlistRef} className={`${styles.roomlist} col-md-2`}>
        <UserList users={userList?.data} onUserClick={handleUserClick} />
      </div>
    </div>
  );
};

export default Chatroom;
