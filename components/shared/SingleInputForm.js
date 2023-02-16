import Button from "./Button";

const SingleInputForm = ({
  state,
  setState,
  type = "text",
  onSubmit,
  buttonName = "Send",
  placeholder = "Type here..",
}) => {
  // console.log("single input form rendered");

  return (
    <div className="d-flex align-items-end">
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="flex-grow-1 p-1"
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="flex-grow-1 p-1"
        />
      )}
      <div className="px-1"></div>
      <Button type="primary" onClick={() => onSubmit()}>
        {buttonName}
      </Button>
    </div>
  );
};

export default SingleInputForm;
