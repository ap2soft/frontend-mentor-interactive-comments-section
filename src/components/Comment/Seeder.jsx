import commentsManager from "../../commentsManager";

const seed = async () => {
  const manager = new commentsManager();
  await manager.seed(2);
  window.scrollTo(0, 0);
  window.location.reload();
};

const Seeder = ({ className }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <button className="text-blue hover:text-blue-light" onClick={seed}>
        Seed Comments
      </button>
    </div>
  );
};

export default Seeder;