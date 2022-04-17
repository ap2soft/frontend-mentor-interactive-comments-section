function Avatar({ user, className }) {
  return (
    <img
      src={user.avatar}
      alt={`${user.name}'s Avatar`}
      className={`h-8 w-8 rounded-full shadow-inner shadow-gray ${className}`}
    />
  );
}

export default Avatar;
