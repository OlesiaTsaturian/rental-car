import { Form, Formik, Field, FormikHelpers, ErrorMessage } from 'formik';
import css from './BookCar.module.css';
import * as Yup from 'yup';

interface Props {
  userName: string;
  email: string;
  date: string;
  comment: string;
}

const initialValues: Props = {
  userName: '',
  email: '',
  date: '',
  comment: '',
};

const Schema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default function BookCarForm() {
  const handleSubmit = (values: Props, actions: FormikHelpers<Props>) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <div>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Schema}
      >
        <Form>
          <label>
            <span className={css.visuallyHidden}>Name</span>
            <Field type="text" name="userName" placeholder="Name*" required />
            <ErrorMessage
              name="userName"
              component="span"
              className={css.error}
            />
          </label>

          <label>
            <span className={css.visuallyHidden}>Email</span>
            <Field type="email" name="email" placeholder="Email*" required />
            <ErrorMessage name="email" component="span" className={css.error} />
          </label>

          <label>
            <span className={css.visuallyHidden}>Booking date</span>
            <Field type="date" name="date" placeholder="Booking date" />
          </label>
          <label>
            <span className={css.visuallyHidden}>Comment</span>
            <Field as="textarea" name="comment" placeholder="Comment" />
          </label>

          <button type="submit">Send</button>
        </Form>
      </Formik>
    </div>
  );
}
