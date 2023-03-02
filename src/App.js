import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const result = window.confirm(
        `${newName} is already in the phone book. Replace?`
      );
      if (result) {
        personsService
          .update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(`Failed to update ${newName}'s number`);
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personsService.create(nameObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          alert(`Failed to delete ${person.name}: ${error.message}`);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  console.log(persons);
  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
