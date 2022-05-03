const AbstractButton = ({ className, active, onClick, children }) => {
  const activeClasses = active ? "text-blue" : "text-blue-light";

  return (
    <button
      className={`grid h-10 w-10 place-content-center bg-gray-light font-bold ${activeClasses} transition hover:text-blue tablet:h-8 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AbstractButton;
