const Avatar = ({ user, className }) => (
  <img
    src={user.image.png}
    alt={`${user.username}'s Avatar`}
    className={`h-8 w-8 rounded-full shadow-inner shadow-gray ${className}`}
  />
);

export default Avatar;
