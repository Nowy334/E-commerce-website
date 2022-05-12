import Link from "next/link";
import classes from "./Button.module.scss";

const Button: React.FC<{
  path?: string;
  btnText?: string;
  square?: boolean;
  classname?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  form?: string;
  onClick?: () => void;
}> = ({
  path,
  btnText,
  square = true,
  classname,
  onClick,
  type = "button",
  disabled = false,
  form,
}) => {
  return (
    <>
      {path ? (
        <Link href={path}>
          <a
            onClick={onClick}
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
      ) : (
        <button
          className={classes.btn + " " + classname ? classname : ""}
          onClick={onClick}
          type={type}
          disabled={disabled}
          form={form}
        >
          {btnText}
        </button>
      )}
    </>
  );
};

export default Button;
