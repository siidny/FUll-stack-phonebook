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
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
            const updatedPerson = response.data;
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `${newName} has already been deleted from the server.`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
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
      setSuccessMessage(`${newName} has been added to the phone book.`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const NotificationSuccess = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="success">{message}</div>;
  };
  const NotificationError = ({ message }) => {
    if (message === null) {
      return null;
    }
    return <div className="error">{message}</div>;
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

  const filteredPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filterText.toLowerCase())
  );

  console.log("persons", this.state.persons);
  console.log("newName", this.state.newName);
  console.log("newNumber", this.state.newNumber);

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />

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
