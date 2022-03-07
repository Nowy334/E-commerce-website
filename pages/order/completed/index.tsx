import type { NextPage } from "next";
import Completed from "../../../components/page/Completed/Completed";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../store/hooks";

const CompleteOrderPage: NextPage = () => {
  const router = useRouter();
  const formItems = useAppSelector((state) => state.form);
  const cartItems = useAppSelector((state) => state.cart);

  if (typeof window !== "undefined") {
    //if (!formItems.email || !cartItems.length || router.query) router.push("/");
  }

  return (
    <main>
      <Completed />
    </main>
  );
};

export default CompleteOrderPage;
