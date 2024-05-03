const Input = ({ label, name, type = "text", handleChange, ...rest }) => {
  return (
    <input
      onChange={handleChange}
      type={type}
      value={name}
      placeholder={label}
      className="w-full p-2 rounded bg-black border border-gray-700 text-white placeholder-gray-400"
    />
  );
};

export default Input;
