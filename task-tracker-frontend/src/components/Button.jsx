const Button = ({ type = "add", onClick }) => {
  const baseClasses =
    "text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    add: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
    delete: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
    edit: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500",
  };

  const labels = {
    add: "Add Task",
    delete: "Delete Task",
    edit: "Edit Task",
  };

  const label = labels[type] || "Action";
  const style = styles[type] || styles.add;

  return (
    <button
      type="button"
      className={`${baseClasses} ${style}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;
