import Category from "interfaces/Category";

export default interface CategoriesProps {
  categoryList: Category[];
  categoryMap: {
    [key: string]: Category;
  };
  loading: boolean;
  error: null | Error;
}
