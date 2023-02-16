import { Typography } from "antd";
import React from "react";
const { Text } = Typography;

const Comment = (props) => {
  // console.log("comment rendered");
  const { comment } = props;

  return (
    <div
      style={{
        margin: "5px 0",
        backgroundColor: "#eee",
        border: "solid 1px orange",
      }}
      elevation={0}
    >
      <div className="d-flex justify-content-between align-items-center">
        <Text>{comment.username}</Text>
        <Text type="secondary">{comment.createdAt.substr(0, 10)}</Text>
      </div>
      <Text>{comment.body}</Text>
    </div>
  );
};

// export default Comment;
export default React.memo(Comment);
