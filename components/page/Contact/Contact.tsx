import s from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={s.container}>
      <iframe
        className={s.responsive}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2555.676872256838!2d18.90243071591824!3d50.16717957943742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ca2a3501c4c5%3A0xbe43d5b5407378d!2sKatya%20RG%20Leotards!5e0!3m2!1spl!2spl!4v1645955237451!5m2!1spl!2spl"
        // width="600"
        // height="450"
        frameBorder={"0"}
        //allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Contact;
