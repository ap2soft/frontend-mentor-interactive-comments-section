function Card(props) {
  return (
    <div className={`rounded-md bg-white p-4 ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
