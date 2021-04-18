const signInSchema = {
  email: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    email: { message: "n'est pas valide !" },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 128,
    },
  },
};

const signUpSchema = {
  firstname: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 3,
      maximum: 15,
    },
  },
  lastname: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 15,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      maximum: 15,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    email: { message: "n'est pas valide !" },
    length: { maximum: 64 },
  },
  password: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 6,
      maximum: 128,
      message: ":minimum 6 caractère!",
    },
  },
  confirmpassword: {
    presence: { allowEmpty: false, message: "est obligatoire!" },
    length: {
      minimum: 6,
      maximum: 128,
      message: ":minimum 6 caractère!",
    },
  },
};
export { signInSchema, signUpSchema};