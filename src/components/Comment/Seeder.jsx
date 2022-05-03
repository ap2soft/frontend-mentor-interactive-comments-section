import { reseedDatabase } from "../../commentsManager";

const seedHandler = async () => {
  window.scrollTo(0, 0);
  await reseedDatabase(5);
  window.location.reload();
};

export const Seeder = ({ className }) => (
  <div className={`flex justify-center ${className}`}>
    <button className="text-blue hover:text-blue-light" onClick={seedHandler}>
      Reseed Comments
    </button>
  </div>
);
