export default function FormSubmitButton({ className }) {
  return (
    <button
      type="submit"
      className={`rounded-md bg-blue px-6 py-2 font-bold uppercase text-white transition hover:bg-blue-light ${className}`}
    >
      Send
    </button>
  );
}
