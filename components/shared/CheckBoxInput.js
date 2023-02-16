const CheckBoxInput = ({ children, value, onChange, required = true }) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        value={value}
        onChange={(e) => onChange(!value)}
        required={required}
      />
      <label className="form-check-label">{children}</label>
    </div>
  );
};

export default CheckBoxInput;
