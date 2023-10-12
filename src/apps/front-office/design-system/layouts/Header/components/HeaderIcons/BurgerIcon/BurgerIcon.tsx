import { burgerIconsAtom } from "apps/front-office/design-system/atoms/headerAtoms";

export default function BurgerIcon() {
  return (
    <div
      className="lg:hidden  flex gap-[5px] flex-col cursor-pointer"
      onClick={burgerIconsAtom.open}>
      <div className="w-5 h-[2px] bg-black"></div>
      <div className="w-3 h-[2px] bg-black"></div>
      <div className="w-5 h-[2px] bg-black"></div>
    </div>
  );
}