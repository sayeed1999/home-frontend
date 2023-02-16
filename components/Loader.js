import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  // note: all these are statuses
  const posts = useSelector((state) => state.posts.status) === "loading";
  const auth = useSelector((state) => state.auth.status) === "loading";

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive((_prev) => posts || auth);
  }, [posts, auth]);

  if (!active) return <></>;

  return (
    <div
      style={{
        zIndex: "999",
        position: "fixed",
        height: "100vh",
        width: "100%",
        background: "#00002040",
      }}
    >
      <Spin
        size="large"
        style={{
          position: "absolute",
          top: "50vh",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  );
}
