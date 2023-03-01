const Filter = ({ filterText, handleFilterChange }) => {
  return (
    <div>
      filter: <input value={filterText} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
