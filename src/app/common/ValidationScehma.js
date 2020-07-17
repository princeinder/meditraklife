import * as yup from "yup";
const validationSchemas = {
  SignIn: yup.object().shape({
    role: yup.string().required("Role must be selected."),
    email: yup
      .string()
      .email()
      .required("Email is required"),
    password: yup.string().required("Password is required.")
  }),
  SignUp: yup.object().shape({
    role: yup.string().required("Role must be selected."),
    fullname: yup
      .string()
      .required("Required.")
      .min(2, "Too Short.!")
      .max(50, "Too Long.!"),
    UID: yup
      .string()
      .required("Required.")
      .min(6, "Too Short.!")
      .max(50, "Too Long.!"),
    email: yup
      .string()
      .email()
      .required("Email is required"),
    password: yup.string().required("Password is required.")
  }),
  ResetPassword: yup.object().shape({
    email: yup
      .string()
      .email()
      .required("Email is required")
  })
};

export default validationSchemas;
