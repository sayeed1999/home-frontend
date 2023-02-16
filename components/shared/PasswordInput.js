const PasswordInput = ({ name, required = true, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-text">{name}</label>
      <input
        type="password"
        className="form-control"
        placeholder={`Enter ${name}`}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {required && (
        <small className="form-text text-muted">*Field is required</small>
      )}
    </div>
  );
};

export default PasswordInput;
