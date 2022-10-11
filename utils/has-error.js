const hasError = (formik, field) => {
  const { touched, errors } = formik;
  return touched[field] && errors[field] ? true : false;
};

export default hasError;
