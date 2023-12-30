import { categoriesType } from "../PopularDishes";
import styles from "./styles.module.scss";
export type PopularDishesTabsProps = {
  categories: categoriesType[];
  setActiveCategories: (id) => void;
  activeCategories: number;
};
export default function PopularDishesTabs({
  categories,
  setActiveCategories,
  activeCategories,
}: PopularDishesTabsProps) {
  if (!categories) {
    return null;
  }

  return (
    <>
      <div className={styles.tabs}>
        <ul>
          <li
            onClick={() => setActiveCategories(0)}
            className={!activeCategories ? "bg-primary-main" : ""}>
            All
          </li>
          {categories.map(category => (
            <li
              key={category.id}
              className={
                activeCategories === category.id ? "bg-primary-main" : ""
              }
              onClick={() => setActiveCategories(category.id)}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
