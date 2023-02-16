import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SyntaxHighter from "react-syntax-highlighter";
import { tapHeart } from "../../../store/reducers/postsReducer";
import { PostCategoryEnum } from "../../../utils/enums/global-enum";
import Comments from "./Comments";
const { Text, Link } = Typography;

const Post = ({ post }) => {
  // console.log("post rendered");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const headerSection = (
    <div className="d-flex justify-content-between align-items-center">
      <Text level={3}>{post.username ?? "Anonymous user"}</Text>
      <Text type="secondary">{post.createdAt?.substring(0, 10)}</Text>
    </div>
  );

  const bodySection =
    post.category === PostCategoryEnum.json ? (
      <SyntaxHighter language={PostCategoryEnum.json} code={post.body} />
    ) : post.category === PostCategoryEnum.sql ? (
      <SyntaxHighter language={PostCategoryEnum.sql} code={post.body} />
    ) : (
      <Text> {post.body} </Text>
    );

  const footerSection = (
    <div className="mt-1 d-flex align-items-center">
      <Button
        danger
        shape="circle"
        style={{ border: "none" }}
        icon={
          post?.likes?.includes(currentUser?.userid) ? (
            <HeartFilled />
          ) : (
            <HeartOutlined />
          )
        }
        onClick={() => dispatch(tapHeart(post))}
      />
      <Text type="secondary">
        <small>
          {post?.likes?.includes(currentUser?.userid)
            ? `You and ${post?.likes?.length - 1} others`
            : `${post?.likes?.length} others`}
        </small>
      </Text>
    </div>
  );

  const horizontalRow = <hr style={{ margin: "2px 0" }} />;
  const commentsSection = (
    <Comments comments={post.comments} postId={post._id} />
  );

  return (
    <>
      {post && (
        <Card style={{ marginBottom: "20px" }}>
          {headerSection}
          {bodySection}
          {footerSection}
          {horizontalRow}
          {commentsSection}
        </Card>
      )}
    </>
  );
};

export default React.memo(Post);
// improves performance since newsfeed is rendering 4times
// instead of once, but memo() is forcing Post to render only once..

// without React.memo() on Post component,
// if the newsfeed had 500+ components at once,
// the new post input form was getting too slow...
