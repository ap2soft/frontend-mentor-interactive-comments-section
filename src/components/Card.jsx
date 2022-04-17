export const Card = ({ className, children: slot }) => (
  <div className={`rounded-md bg-white p-4 tablet:p-6 ${className}`}>
    {slot}
  </div>
);
