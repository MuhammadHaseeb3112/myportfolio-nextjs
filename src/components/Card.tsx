import { twMerge } from "tailwind-merge";
import grainImage from "@/assets/images/grain.jpg";
import { ComponentPropsWithoutRef, PropsWithChildren, PropsWithoutRef } from "react";
export const Card = ({
  className,
  children,
  ...otherProps
}:ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge(
        "bg-gray-800 rounded-3xl relative z-0 overflow-hidden after:z-10  after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl   after:pointer-events-none after:outline-white/20 ",
        className
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0 bg-sky-400/10 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>

      {children}
    </div>
  );
};
