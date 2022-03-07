import { FC, useState } from "react";
import Image, { ImageLoaderProps } from "next/image";
import s from "./ProductImages.module.scss";
import LightBox from "../../ui/LightBox/LightBox";
import Carousel from "../../ui/Carousel/Carousel";

const ProductImages: FC<{ images: string[] }> = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${src}?w=${width}&q=${quality || 75}`;
  };

  const thumbnails = images.map((item, index) => {
    return (
      <div
        className={
          s.image__thumbnail + " " + (selectedImg === item ? s.active : "")
        }
        key={index}
        onClick={() => setSelectedImg(item)}
      >
        <Image
          loader={myLoader}
          src={item}
          alt="thumbnails"
          objectFit="cover"
          layout="fill"
        />
      </div>
    );
  });

  return (
    <>
      <div className={s.container}>
        <div className={s.thumbnails}>{thumbnails}</div>
        <div className={s.main__image}>
          <Image
            loader={myLoader}
            src={selectedImg}
            alt="thumbnails"
            objectFit="contain"
            layout="fill"
            onClick={() => setLightBoxDisplay(true)}
          ></Image>
        </div>
      </div>
      {lightboxDisplay ? (
        <LightBox image={selectedImg} images={images} onClose={hideLightBox} />
      ) : null}
    </>
  );
};

export default ProductImages;
