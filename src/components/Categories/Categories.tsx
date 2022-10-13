import styles from "./Categories.module.css";
import categories from "../../data";

const Categories = () => {
  return (
    <section className={styles.categories}>
      {categories.map((category) => (
        <div key={category.name}>
          <img src={category.imageUrl} alt="category" />
          <span>{category.name}</span>
        </div>
      ))}
    </section>
  );
};

export default Categories;
