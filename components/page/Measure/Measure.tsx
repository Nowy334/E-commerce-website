import s from "./Measure.module.scss";
import { Measures as MeasuresData } from "data/measures";
import { MutableRefObject, useState } from "react";
import validateForm from "../../../helpers/validator";
import ContactForm from "components/functional/Form/ContactForm/ContactForm";

const Measure = () => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>();

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
  };

  return (
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
              />
            </li>
          ))}
        </ul>
      </ContactForm>
    </div>
  );
};

export default Measure;
