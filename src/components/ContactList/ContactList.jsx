import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilterValue } from 'redux/selectors';

import { deleteContacts } from 'redux/contactsSlice';
import PropTypes from 'prop-types';

import { BsTelephoneForward, BsPersonX } from 'react-icons/bs';
import {
  FilteredList,
  FilteredListItem,
  DeleteBtn,
} from './ContactList.styled';

export default function ContactList() {
  const dispatch = useDispatch();
  const { contacts } = useSelector(getContacts);
  const filter = useSelector(getFilterValue);

  const onDeleteContact = delContactId => {
    dispatch(deleteContacts(delContactId));
  };
  const getFilteredContacts = () => {
    const normaliziedFilter = filter.toLowerCase();
    return contacts?.filter(({ name }) =>
      name.toLowerCase().includes(normaliziedFilter)
    );
  };

  const filteredContactsList = getFilteredContacts();

  return (
    <FilteredList>
      {filteredContactsList.map(({ id, name, number }) => {
        return (
          <FilteredListItem key={id}>
            <p>
              <BsTelephoneForward />
              {name + ': ' + number}{' '}
            </p>
            <DeleteBtn type="button" onClick={() => onDeleteContact(id)}>
              delete <BsPersonX size={14} />
            </DeleteBtn>
          </FilteredListItem>
        );
      })}
    </FilteredList>
  );
}

ContactList.propTypes = {
  filteredContactsList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
