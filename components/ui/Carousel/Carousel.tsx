import { FC } from "react";
import s from "./Carousel.module.scss";

const Carousel: FC = ({ children }) => {
  return (
    <div className={s.carousel__container}>
      <div className={s.carousel__wrapper}>
        <div className={s["carousel__content-wrapper"]}>
          <div className="carousel__content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
