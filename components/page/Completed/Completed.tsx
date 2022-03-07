import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { changeCompleted } from "../../../store/completed.slice";
import { useAppDispatch } from "../../../store/hooks";

const Completed = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const completed = useAppSelector((state) => state.completed);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    setOrder(
      JSON.parse(
        localStorage.getItem("order")
          ? (localStorage.getItem("order") as string)
          : ""
      )
    );
  }, []);

  useEffect(() => {
    if (!completed) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      localStorage.removeItem("order");
      dispatch(changeCompleted({ value: false }));
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return completed ? (
    <div>
      {order &&
        order.map((el: any, i) => {
          return (
            <div key={i}>
              <div>
                <div>
                  <span>{el.fields.title}</span>
                  <span> x{el.quantity}</span>
                </div>
              </div>
              <div>
                <span>
                  {el.fields.color && "kolor: "}
                  {el.fields.color &&
                    el.fields.color.map((item: any, i: number) => {
                      return <span key={i}>{item}</span>;
                    })}
                  {!el.fields.color && !el.fields?.size && (
                    <span>rozmiar: {el.fields.title}</span>
                  )}
                  {el.fields.size && <span>rozmiar: {el.fields.size}</span>}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  ) : (
    <div>elo</div>
  );
};

export default Completed;
