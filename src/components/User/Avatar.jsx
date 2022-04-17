export const Avatar = ({ user, className }) => (
  <img
    src={user.avatar}
    alt={`${user.name}'s Avatar`}
    className={`h-8 w-8 rounded-full shadow-inner shadow-gray ${className}`}
  />
);
