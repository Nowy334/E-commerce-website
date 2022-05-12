import Button from "@ui/Button/Button";
import { FC, MutableRefObject, useRef } from "react";
import s from "./ContactForm.module.scss";

const ContactForm: FC<{
  handleSubmit: (e: any, formRef: MutableRefObject<HTMLFormElement>) => void;
  errors?: { [key: string]: boolean } | undefined;
  children?: React.PropsWithChildren<{}>;
  content?: boolean;
  classes?: string;
}> = ({ handleSubmit, errors, children, content = true, classes }) => {
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;
  const handleData = (e: any) => {
    handleSubmit(e, formRef);
  };
  return (
    <form
      className={s.form + " " + classes}
      id="hook-form"
      ref={formRef}
      onSubmit={handleData}
    >
      <div className={s.form__item}>
        <label htmlFor="firstName">Imię *</label>
        <input type="text" name="firstName" id="firstName" required />
      </div>
      <div className={s.form__item}>
        <label htmlFor="email">Adres e-mail *</label>
        <input type="text" name="email" id="email" required />
        {errors?.email ? (
          <span className={s.error}>Podany adres email jest nieprawidłowy</span>
        ) : null}
      </div>
      <div className={s.form__item}>
        <label htmlFor="title">Tytuł *</label>
        <input type="text" name="title" id="title" required />
      </div>
      {content ? (
        <div className={s.form__item}>
          <label htmlFor="comments">Treść</label>
          <textarea name="comments" id="comments" rows={6} />
        </div>
      ) : null}
      {children}
      <Button classname={s.btn} type="submit" btnText="Wyślij wiadomość" />
    </form>
  );
};

export default ContactForm;
