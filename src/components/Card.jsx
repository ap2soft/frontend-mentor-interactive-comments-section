function Card({ className, children: slot }) {
  return (
    <div className={`rounded-md bg-white p-4 tablet:p-6 ${className}`}>
      {slot}
    </div>
  );
}

export default Card;
