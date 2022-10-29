import styles from "./Categories.module.css";
import categories from "../../data";
import { Category } from "../../models";
import { Dispatch, SetStateAction } from "react";

interface ICategoryProps {
  categoryType: Category;
  setCategoryType: Dispatch<SetStateAction<Category>>;
}

const Categories = ({ categoryType, setCategoryType }: ICategoryProps) => {
  return (
    <section className={styles.categories}>
      {categories.map((category) => (
        <div
          className={
            categoryType === category.id
              ? styles.selected_category
              : styles.unselected_category
          }
          key={category.name}
          onClick={() => setCategoryType(category.id)}
        >
          <span>{category.name}</span>
        </div>
      ))}
    </section>
  );
};

export default Categories;
