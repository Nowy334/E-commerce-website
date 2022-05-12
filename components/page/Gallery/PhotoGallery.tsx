import { FC, useState } from "react";
import s from "./PhotoGallery.module.scss";
import LightBox from "../../ui/LightBox/LightBox";
import Image from "@ui/Image";

const PhotoGallery: FC<{ photos?: any }> = ({ photos }) => {
  let images: string[] = [];
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  if (photos) {
    photos.forEach((photo: any) => {
      images.push(photo.fields.file.url);
    });
  }

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  const handleImage = (item: any) => {
    setLightBoxDisplay(true);
    setSelectedImg(item);
  };

  const gallery = photos.map((item: any, index: number) => {
    return (
      <div
        className={s.image}
        key={index}
        onClick={() => handleImage(item.fields.file.url)}
      >
        <Image
          customLoader={true}
          src={item.fields.file.url}
          alt={item.fields.title}
          objectFit="cover"
          layout="fill"
          blurDataURL={item.fields.file.url}
          placeholder="blur"
        ></Image>
      </div>
    );
  });

  return (
    <>
      <div className={s.gallery}>{gallery}</div>
      {lightboxDisplay ? (
        <LightBox
          image={selectedImg && selectedImg}
          images={images}
          onClose={hideLightBox}
        />
      ) : null}
    </>
  );
};

export default PhotoGallery;
