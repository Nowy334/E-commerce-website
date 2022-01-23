import Link from "next/link";
import classes from "./Button.module.scss";

const Button: React.FC<{
  path: string;
  btnText?: string;
  square?: boolean;
  classname?: string;
}> = ({ path, btnText, square = false, classname }) => {
  return (
    <Link href={path}>
      <a
        className={
          classes.btn +
          " " +
          (square ? classes.square : "") +
          " " +
          (classname ? classname : "")
        }
      >
        {btnText}
      </a>
    </Link>
  );
};

export default Button;
