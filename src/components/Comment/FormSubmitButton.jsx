export default function FormSubmitButton({ className, disabled, children }) {
  return (
    <button
      type="submit"
      className={`rounded-md bg-blue px-6 py-2 font-bold uppercase text-white transition hover:bg-blue-light disabled:cursor-not-allowed disabled:bg-blue-light ${className}`}
      disabled={disabled || false}
    >
      {children || "Submit"}
    </button>
  );
}
