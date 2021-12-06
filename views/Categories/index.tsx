import CategoryCard from "components/CategoryCard";
import { useCategories } from "context/categoryContext";

export default function Categories() {
  const { loading, error, categoryList } = useCategories();
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      {categoryList.map((item) => (
        <CategoryCard {...item} key={item.id} />
      ))}
    </div>
  );
}
