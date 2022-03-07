import { useAppDispatch } from "../../../store/hooks";
import { useAppSelector } from "../../../store/hooks";
import { setData } from "../../../store/form.slice";
import s from "./Form.module.scss";
import { FC } from "react";

const Form: FC<{
  handleSubmit: (e: any) => void;
  errors: { [key: string]: boolean } | undefined;
}> = ({ handleSubmit, errors }) => {
  const formItems = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const handleData = (event: any) => {
    dispatch(setData({ type: event.target.name, value: event.target.value }));
  };

  return (
    <form className={s.form} id="hook-form" onSubmit={handleSubmit}>
      <div className={s.group}>
        <div className={s.form__item}>
          <label htmlFor="firstName">Imię *</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formItems.firstName}
            onChange={(e) => handleData(e)}
            required
          />
        </div>
        <div className={s.form__item}>
          <label htmlFor="lastName">Nazwisko *</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formItems.lastName}
            onChange={(e) => handleData(e)}
            required
          />
        </div>
      </div>
      <div className={s.form__item}>
        <label htmlFor="business">Nazwa firmy (opcjonalnie)</label>
        <input
          type="text"
          name="business"
          id="business"
          value={formItems.business}
          onChange={(e) => handleData(e)}
        />
      </div>
      <div className={s.form__item}>
        <label htmlFor="street">Ulica *</label>
        <input
          type="text"
          name="street"
          id="street"
          value={formItems.street}
          placeholder="Nazwa ulicy, numer budynku / numer lokalu"
          onChange={(e) => handleData(e)}
          required
        />
      </div>
      <div className={s.group}>
        <div className={s.form__item}>
          <label htmlFor="postcode">Kod pocztowy *</label>
          <input
            type="text"
            name="postcode"
            id="postcode"
            value={formItems.postcode}
            onChange={(e) => handleData(e)}
            required
          />
          {errors?.postcode ? (
            <span className={s.error}>
              Podany kod pocztowy jest nieprawidłowy
            </span>
          ) : null}
        </div>
        <div className={s.form__item}>
          <label htmlFor="city">Miasto *</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formItems.city}
            onChange={(e) => handleData(e)}
            required
          />
        </div>
      </div>
      <div className={s.form__item}>
        <label htmlFor="phoneNumber">Numer telefonu *</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formItems.phoneNumber}
          onChange={(e) => handleData(e)}
          required
        />
        {errors?.phone ? (
          <span className={s.error}>
            Podany numer telefonu jest nieprawidłowy
          </span>
        ) : null}
      </div>
      <div className={s.form__item}>
        <label htmlFor="email">Adres e-mail *</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formItems.email}
          onChange={(e) => handleData(e)}
          required
        />
        {errors?.email ? (
          <span className={s.error}>Podany adres email jest nieprawidłowy</span>
        ) : null}
      </div>
      <div className={s.form__item}>
        <label htmlFor="comments">Uwagi do zamówienia (opcjonalnie)</label>
        <textarea
          name="comments"
          id="comments"
          rows={5}
          value={formItems.comments}
          onChange={(e) => handleData(e)}
        />
      </div>
    </form>
  );
};

export default Form;
