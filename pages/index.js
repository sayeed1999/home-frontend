import { useRouter } from "next/router";
import { useEffect } from "react";
import AppRoutes from "../constants/AppRoutes";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(AppRoutes.Newsfeed);
  });
  return <div>This is the homepage...</div>;
};

export default Home;
