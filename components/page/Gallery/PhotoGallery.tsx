import { FC, useState } from "react";
import s from "./PhotoGallery.module.scss";
import Image, { ImageLoaderProps } from "next/image";
import LightBox from "../../ui/LightBox/LightBox";

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

  const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https:${src}?w=${width}&q=${quality || 75}`;
  };

  const gallery = photos.map((item: any, index: number) => {
    return (
      <div className={s.image} key={index}>
        <Image
          loader={myLoader}
          src={item.fields.file.url}
          alt={item.fields.title}
          objectFit="cover"
          layout="fill"
          onClick={() => handleImage(item.fields.file.url)}
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
