import { trans } from "@mongez/localization";
import { Link } from "@mongez/react-router";
import Stars from "apps/front-office/design-system/components/Stars";
import MealCardFavorite from "apps/front-office/menu/pages/MealDetailsPage/components/MealCard/MealCardFavorite";
import { Meal } from "apps/front-office/menu/pages/MealDetailsPage/utils/types";
import { price } from "apps/front-office/utils/price";
import URLS from "apps/front-office/utils/urls";
import { TbShoppingBag } from "react-icons/tb";
import useCart from "shared/hooks/useCart";

export type PopularDishesProps = {
  meals: Meal[];
};

export default function PopularDishesItem({ meals }: PopularDishesProps) {
  const { addMealToCart } = useCart();

  return (
    <div className="container grid grid-cols-4 gap-5">
      {meals.slice(0, 8).map(meal => {
        return (
          <div
            className="p-3 group rounded-[2rem] border relative"
            key={meal.id}>
            <MealCardFavorite meal={meal} />
            <Link
              to={URLS.menu.viewMeal(meal)}
              className="h-64 relative overflow-hidden flex items-center justify-center cursor-pointer rounded-3xl">
              <img
                src={meal.image.url + "?w=200&h=200"}
                alt={meal.name}
                width={200}
                height={200}
                className="group-hover:scale-125 z-10 rounded-full transition-transform duration-300"
              />
              <span className="absolute bottom-0 left-0 w-full h-1/2 bg-primary-main rounded-3xl group-hover:bg-opacity-100 group-hover:h-full transition-all duration-300 bg-opacity-10"></span>
            </Link>
            <div className="mt-6 space-y-2 m-3">
              <Stars ratings={meal.ratings} />
              <Link
                to={URLS.menu.viewMeal(meal)}
                className="font-bold text-lg inline-block">
                {meal.name}
              </Link>
              <p title={meal.description} className="line-clamp-2 font-light">
                {meal.description}
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {!meal.salePrice === false && (
                    <span className="inline-block text-secondary">
                      {price(meal?.salePrice)}
                    </span>
                  )}
                  <span
                    className={`inline-block  ${
                      meal.salePrice
                        ? "text-black line-through"
                        : "text-primary-main"
                    }`}>
                    {price(meal.price)}
                  </span>
                </div>
                <button
                  onClick={() => addMealToCart(meal.id, 1)}
                  title={trans("addToCart")}
                  className="bg-primary-main p-2 rounded-2xl hover:bg-primary-hover transition-colors">
                  <TbShoppingBag color="#000"></TbShoppingBag>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
