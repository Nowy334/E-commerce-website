import Image, { ImageLoaderProps } from "next/image";
import { useState } from "react";
import { FC } from "react";
import s from "./LightBox.module.scss";

const LightBox: FC<{
  image: string;
  onClose: () => void;
  images: string[];
}> = ({ image, onClose, images }) => {
  const [imageToShow, setImageToShow] = useState(image);
  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const showNext = (e: any) => {
    e.stopPropagation();
    let currentIndex = images.indexOf(imageToShow);
    if (currentIndex >= images.length - 1) {
      //
    } else {
      let nextImage = images[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  const showPrev = (e: any) => {
    e.stopPropagation();
    let currentIndex = images.indexOf(imageToShow);
    if (currentIndex <= 0) {
    } else {
      let nextImage = images[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      showNext(e);
    }

    if (diff < -5) {
      showPrev(e);
    }

    setTouchPosition(null);
  };

  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div
      className={s.lightbox}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className={s.prev + " " + s.arrow} onClick={showPrev}></div>
      <div className={s.lightbox__image}>
        <Image
          loader={myLoader}
          src={imageToShow}
          alt="thumbnails"
          objectFit="contain"
          layout="fill"
        ></Image>
      </div>
      <div className={s.next + " " + s.arrow} onClick={showNext}></div>
    </div>
  );
};

export default LightBox;
