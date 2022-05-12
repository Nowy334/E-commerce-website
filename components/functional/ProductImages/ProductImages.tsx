import { FC, useState } from "react";
import s from "./ProductImages.module.scss";
import LightBox from "../../ui/LightBox/LightBox";
import Carousel from "../../ui/Carousel/Carousel";
import Image from "@ui/Image";

const ProductImages: FC<{ images: string[] }> = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  const hideLightBox = () => {
    setLightBoxDisplay(false);
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
          customLoader={true}
          src={item}
          alt="thumbnails"
          objectFit="cover"
          layout="fill"
          priority={true}
        />
      </div>
    );
  });

  return (
    <>
      <div className={s.container}>
        <div className={s.thumbnails}>{thumbnails}</div>
        <div className={s.main__image} onClick={() => setLightBoxDisplay(true)}>
          <Image
            customLoader={true}
            src={selectedImg}
            alt="thumbnails"
            objectFit="contain"
            layout="fill"
            priority={true}
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
