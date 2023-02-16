const NumberInput = ({
  name,
  required = true,
  min, // = Number.MIN_SAFE_INTEGER,
  max, // = Number.MAX_SAFE_INTEGER,
}) => {
  return (
    <div className="form-group">
      <label className="form-text">{name}</label>
      <input
        type="number"
        className="form-control"
        placeholder={`Enter ${name}`}
        min={min || Number.MIN_SAFE_INTEGER}
        max={max || Number.MAX_SAFE_INTEGER}
      />
      {required && <small className="text-muted">*Field is required</small>}
    </div>
  );
};

export default NumberInput;
