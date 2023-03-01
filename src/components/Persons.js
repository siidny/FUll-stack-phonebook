const Persons = ({ filteredPersons }) => {
  if (filteredPersons.length === 0) {
    return <p>No matches found</p>;
  }
  return (
    <ul>
      {filteredPersons.map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
