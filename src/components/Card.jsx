function Card({ className, children: slot }) {
  return <div className={`rounded-md bg-white p-4 ${className}`}>{slot}</div>;
}

export default Card;
