import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

import { addContacts } from 'redux/contactsSlice';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormBetter } from './ContactForm.styled';
import { BsPersonPlus } from 'react-icons/bs';

const schemaAddContact = Yup.object().shape({
  name: Yup.string().min(4).max(32).required(),
  number: Yup.string().min(4).max(9).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const { contacts } = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    addContact(values);
    resetForm();
  };

  const addContact = newContact => {
    checkDouble(newContact)
      ? alert(`${newContact.name} is already exist in contacts`)
      : dispatch(addContacts(newContact));
  };
  const checkDouble = newContact => {
    return contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemaAddContact}
      onSubmit={handleSubmit}
    >
      {}
      <FormBetter>
        <label>
          Name
          <Field
            type="text"
            name="name"
            required
            autoComplete="false"
            placeholder="input your name"
          />
          <ErrorMessage component="div" name="name" />
        </label>
        <label>
          Number
          <Field
            type="tel"
            name="number"
            required
            placeholder="input your number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage component="div" name="number" />
        </label>
        <button type="submit">
          <BsPersonPlus size={16} />
          Add contact
        </button>
      </FormBetter>
    </Formik>
  );
}
