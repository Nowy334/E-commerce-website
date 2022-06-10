import ContactForm from "components/functional/Form/ContactForm/ContactForm";
import { useState, MutableRefObject } from "react";
import validateForm from "../../../helpers/validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrMail } from "react-icons/Gr";
import { HiHome } from "react-icons/Hi";
import { AiFillPhone } from "react-icons/Ai";
import s from "./Contact.module.scss";

const Contact = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>();
  const notifySuccess = () => {
    toast.success("Wiadomość została wysłana!");
  };
  const notifyError = () => {
    toast.error("Wystąpił problem. Spróbuj ponownie");
  };
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (
    e: any,
    formRef: MutableRefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    const validate = validateForm({ email: e.target.email.value });
    setErrors(validate);
    for (const item in validate) {
      if (validate[item]) {
        return;
      }
    }
    const body = {
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      title: e.target.title.value,
      description: e.target.comments.value,
      code: "contact",
    };

    try {
      setLoader(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      console.log(json);
      if (res.status === 200 && json.message === "success") {
        formRef.current.reset();
        notifySuccess();
        setLoader(false);
      }
      if (res.status === 400 && json.message === "error") {
        notifyError();
        setLoader(false);
      }
    } catch (err) {
      notifyError();
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <div className={s.container}>
      <main className={s.main}>
        <div className={s.group}>
          <h2 className={s.header}>Dane kontaktowe</h2>
          <ul className={s.list}>
            <li>“Katya” RG Leotards Katarzyna Dębska</li>
            <li>
              <HiHome /> Ul. Pszczyńska 12D/5 43-190 Mikołów
            </li>
            <li>
              <AiFillPhone /> +48 577 044 090
            </li>
            <li>
              <GrMail /> katya.rgleotards@gmail.com
            </li>
            <li>Numer konta: 14 1140 2004 0000 3802 7796 9903</li>
          </ul>
          <iframe
            className={s.responsive}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d99586.77589767!2d18.886831871018813!3d50.16582276754507!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbe43d5b5407378d!2sKatya%20RG%20Leotards!5e0!3m2!1spl!2sus!4v1652220830341!5m2!1spl!2sus"
            frameBorder={"0"}
            loading="lazy"
          ></iframe>
        </div>
        <div className={s.form__container}>
          <h2 className={s.header}>Formularz kontaktowy</h2>
          <ContactForm
            handleSubmit={handleSubmit}
            errors={errors}
            loader={loader}
            name="Imię *"
          />
        </div>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Contact;
