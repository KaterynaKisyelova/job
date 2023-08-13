type Props = {
  type: "text" | "email" | "password";
  name: string;
  value: string;
  handleChange(e: React.ChangeEvent): void;
  labelText?: string;
};

const FormRow = ({ type, name, value, handleChange, labelText }: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
