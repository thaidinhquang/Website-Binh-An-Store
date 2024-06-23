
const Checkbox = ({ id, name, handleChange, checked, className }) => {
  return (
    <div>
      <input
        className={className}
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked} 
      />
    </div>
  );
};

export default Checkbox;
