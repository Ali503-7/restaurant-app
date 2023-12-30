import { trans } from "@mongez/localization";
import { useOnce } from "@mongez/react-hooks";
import { Meal } from "apps/front-office/menu/pages/MealDetailsPage/utils/types";
import { useEffect, useState } from "react";
import PopularDishesItem from "./PopularDishesItem/PopularDishesItem";
import PopularDishesTabs from "./PopularDishesTabs/PopularDishesTabs";
import styles from "./styles.module.scss";

export type PopularDishesProps = {
  meals: Meal[];
};

export type categoriesType = {
  name: string;
  id: number;
};

export default function PopularDishes({ meals }: PopularDishesProps) {
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [activeCategories, setActiveCategories] = useState(0);
  const [filteredMeals, setFilteredMeals] = useState(meals);

  useOnce(() => {
    const categoriesObj = {};

    meals.forEach(meal => {
      const catId = meal.category.id;

      if (!categoriesObj[catId]) {
        categoriesObj[catId] = {
          name: meal.category.name,
          id: meal.category.id,
        };
      }
    });

    setCategories(Object.values(categoriesObj));
  });

  useEffect(() => {
    setFilteredMeals(() => {
      if (!activeCategories) return meals;
      return meals.filter(meal => meal.category.id === activeCategories);
    });
  }, [activeCategories]);

  return (
    <div className={styles.popularDishes}>
      <h1>{trans("PopularDishes")}</h1>
      <PopularDishesTabs
        categories={categories}
        setActiveCategories={setActiveCategories}
        activeCategories={activeCategories}
      />
      <PopularDishesItem meals={filteredMeals} />
    </div>
  );
}
