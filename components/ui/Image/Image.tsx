import Image, { ImageLoaderProps, ImageProps } from "next/image";

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https:${src}?w=${width}&q=${quality || 75}`;
};

type Props = ImageProps & {
  customLoader?: boolean;
};

export default function MyImage({
  src,
  width,
  height,
  alt,
  layout,
  objectFit,
  priority = false,
  placeholder = "empty",
  unoptimized = false,
  customLoader = false,
  blurDataURL = "",
}: Props) {
  return (
    <>
      {customLoader ? (
        <Image
          loader={myLoader}
          src={src}
          layout={layout}
          alt={alt}
          width={width}
          height={height}
          blurDataURL={blurDataURL}
          placeholder={placeholder}
          objectFit={objectFit}
          unoptimized={unoptimized}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          layout={layout}
          alt={alt}
          width={width}
          height={height}
          blurDataURL={blurDataURL}
          placeholder={placeholder}
          objectFit={objectFit}
          priority={priority}
          unoptimized={unoptimized}
        />
      )}
    </>
  );
}
