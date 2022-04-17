const AbstractButton = ({ className, onClick, children }) => (
  <button
    className={`grid h-10 w-10 place-content-center bg-gray-light font-bold text-blue-light transition hover:text-blue tablet:h-8 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default AbstractButton;
