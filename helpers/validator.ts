import validator from "validator";

type validate = {
  [key: string]: boolean;
};

const validateForm = (formItems: any) => {
  let data: validate = {
    email: false,
    phone: false,
    postcode: false,
  };
  let postCodeRegex = /[0-9]{2}-[0-9]{3}/;

  if (formItems.email && !validator.isEmail(formItems.email)) {
    data.email = true;
  }
  if (
    formItems.phoneNumber &&
    !validator.isMobilePhone(formItems.phoneNumber)
  ) {
    data.phone = true;
  }

  if (formItems.postcode && !postCodeRegex.test(formItems.postcode)) {
    data.postcode = true;
  }

  return data;
};

export default validateForm;
