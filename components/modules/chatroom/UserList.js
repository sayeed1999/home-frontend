import { MenuFoldOutlined } from "@ant-design/icons";
import styles from "../../../styles/Chatroom.module.scss";
import Button from "../../shared/Button";

const UserList = ({ users, onUserClick }) => {
  return (
    <>
      {users?.map((user, index) => (
        <div
          key={index}
          className={styles.roomlistitem}
          onClick={() => onUserClick(user)}
        >
          #{user.name}
        </div>
      ))}
      <div className="text-center d-md-none">
        <Button
          type="primary"
          shape="circle"
          icon={<MenuFoldOutlined />}
          onClick={() => {}}
        />
      </div>
    </>
  );
};

export default UserList;
