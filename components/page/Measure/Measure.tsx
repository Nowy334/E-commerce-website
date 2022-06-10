import s from "./Measure.module.scss";
import { Measures as MeasuresData } from "data/measures";
import { MutableRefObject, useState } from "react";
import validateForm from "../../../helpers/validator";
import ContactForm from "components/functional/Form/ContactForm/ContactForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Measure = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>();
  const [loader, setLoader] = useState(false);
  const notifySuccess = () => {
    toast.success("Wiadomość została wysłana!");
  };
  const notifyError = () => {
    toast.error("Wystąpił problem. Spróbuj ponownie");
  };

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
    let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      'input[type="number"]'
    );
    let measures = Array.from(inputs).map((el) => el.value);

    const body = {
      firstName: e.target.firstName.value,
      email: e.target.email.value,
      title: e.target.title.value,
      measures,
      code: "measures",
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
    <>
      <div className={s.container}>
        <iframe
          className={s.responsive}
          src="https://www.youtube.com/embed/xX8aIRpFf3s"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <ContactForm
          handleSubmit={handleSubmit}
          classes={s.contact}
          content={false}
          errors={errors}
          loader={loader}
          name="Imię i nazwisko zawodniczki *"
        >
          <ul className={s.list}>
            {MeasuresData.map((el, i) => (
              <li key={i}>
                {el} -{" "}
                <input
                  className={s.input}
                  type="number"
                  name={`data_${i + 1}`}
                  id={`data_${i + 1}`}
                  min={0}
                  max={200}
                  required
                />{" "}
                cm
              </li>
            ))}
          </ul>
        </ContactForm>
      </div>
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
    </>
  );
};

export default Measure;
