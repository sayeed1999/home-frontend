import { Radio } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Post from "../../components/modules/newsfeed/Post";
import Button from "../../components/shared/Button";
import SingleInputForm from "../../components/shared/SingleInputForm";
import {
  createPost,
  fetchPosts,
  loadMore,
} from "../../store/reducers/postsReducer";
import { PostCategoryEnum } from "../../utils/enums/global-enum";
import { useScroll } from "../../utils/hooks/scroll";

const Newsfeed = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const posts = useSelector((state) => state.posts.posts);
  useScroll();
  const postsStatus = useSelector((state) => state.posts.status);
  // new post form fields...
  const [category, setCategory] = useState(PostCategoryEnum.text);
  const [postBody, setPostBody] = useState("");

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    } else if (postsStatus === "succeeded") {
      setPostBody(() => "");
    }
  }, [postsStatus, dispatch]);

  // scrollHandler hook used to load more datas when scrolled at the bottom
  const fetchMore = () => {
    dispatch(loadMore());
  };
  // useScrollBottomHandler(fetchMore); // not working on current layout

  const onRadioChange = (event) => {
    setCategory((prev) => event.target.value);
  };

  const createNewPost = () => {
    if (!postBody.trim()) {
      return swal("Info", "Cannot post an empty post", "Info");
    }
    dispatch(
      createPost({
        postBody,
        category,
      })
    );
  };

  const littleSpace = <div style={{ height: "15px" }}></div>;

  const form = (
    <div className="col-md-12 my-2">
      <Radio.Group onChange={onRadioChange} value={category}>
        {Object.keys(PostCategoryEnum).map((key) => (
          <Radio key={key} value={PostCategoryEnum[key]}>
            {key}
          </Radio>
        ))}
      </Radio.Group>
      <SingleInputForm
        state={postBody}
        setState={setPostBody}
        type="textarea"
        onSubmit={createNewPost}
      />
    </div>
  );

  const postsGrid = Object.entries(posts).map((entry) => (
    <div className="col-md-12" key={entry[0]}>
      <Post post={entry[1]} />
    </div>
  ));

  const showMore = (
    <div className="m-2 text-center">
      <Button type="primary" size="large" onClick={fetchMore}>
        SHOW MORE
      </Button>
    </div>
  );

  return (
    <div className="row" id="feedbox">
      {littleSpace}
      {currentUser && form}
      {posts && postsGrid}
      {showMore}
    </div>
  );
};

export default Newsfeed;
