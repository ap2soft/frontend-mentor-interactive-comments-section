function Avatar({ user }) {
  return (
    <img
      src={user.avatar}
      alt={`${user.name}'s Avatar`}
      className="h-8 w-8 rounded-full"
    />
  );
}

export default Avatar;
