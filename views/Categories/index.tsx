import CategoryCard from "components/CategoryCard";
import { useUser } from "context/userContext";
import useCategories from "hooks/useCategories";

export default function Categories() {
  const {
    user: { uid },
  } = useUser();
  const { loading, error, categories } = useCategories(uid);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      {categories.map((item) => (
        <CategoryCard {...item} key={item.id} />
      ))}
    </div>
  );
}
