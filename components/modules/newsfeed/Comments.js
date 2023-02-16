import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentOnPost } from "../../../store/reducers/postsReducer";
import SingleInputForm from "../../shared/SingleInputForm";
import Comment from "./Comment";

const Comments = ({ comments, postId }) => {
  // console.log("comments rendered");
  const [hideComments, setHideComments] = useState(true);
  const [commentBody, setCommentBody] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setCommentBody("");
  }, [comments]);

  const createNewComment = () => {
    if (!commentBody.trim()) {
      return swal("Info", "Cannot comment and empty comment", "info");
    }
    dispatch(commentOnPost({ commentBody, postId }));
  };

  const commentsHeader = (
    <>
      <strong>
        <small>Comments</small>
      </strong>
      <Button
        shape="circle"
        size="small"
        icon={hideComments ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
        onClick={() => setHideComments((prev) => !prev)}
      />
    </>
  );

  const newCommentForm = (
    <SingleInputForm
      type="textarea"
      state={commentBody}
      setState={setCommentBody}
      onSubmit={createNewComment}
    />
  );

  const commentsOnUI = Object.entries(comments).map((entry) => (
    <Comment comment={entry[1]} key={entry[0]} />
  ));

  const noCommentsFound = (
    <div className="d-flex justify-content-between align-items-center">
      <hr className="flex-grow-1" />
      <small className="mx-3">No comments found</small>
      <hr className="flex-grow-1" />
    </div>
  );

  return (
    <>
      {commentsHeader}
      {!hideComments && (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-11">
            {currentUser && newCommentForm}
            {comments?.length ? commentsOnUI : noCommentsFound}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Comments);
