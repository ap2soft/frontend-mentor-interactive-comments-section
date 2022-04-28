const AbstractButton = ({ className, active, onClick, children }) => (
  <button
    className={`grid h-10 w-10 place-content-center bg-gray-light font-bold ${
      active ? "text-blue" : "text-blue-light"
    } transition hover:text-blue tablet:h-8 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default AbstractButton;
