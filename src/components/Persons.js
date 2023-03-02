const Persons = ({ filteredPersons, deletePerson }) => {
  if (filteredPersons.length === 0) {
    return <p>No matches found</p>;
  }
  return (
    <ul>
      {filteredPersons.map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
          <button onClick={() => deletePerson(id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
