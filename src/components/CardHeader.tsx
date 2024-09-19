import StarIcon from "@/assets/icons/star.svg";
import { twMerge } from "tailwind-merge";
export const CardHeader = ({
  title,
  description,
  className,
  IntroSize,
  introTitle,
}: {
  title: string;
  description: string;
  className?: string
  IntroSize?: string
  introTitle?: string
}) => {
  return (
      <div className={twMerge("flex flex-col p-6 md:py-8 md;px-10", className)}>
        <div className="inline-flex items-center gap-4">
          <StarIcon className="size-9 text-emerald-300" />
          <h3 className={twMerge("font-serif text-3xl" , introTitle)}>{title}</h3>
        </div>
        <p className={twMerge("text-white/60 text-sm mt-2 lg:text-base max-w-xs ", IntroSize)}>{description}</p>
      </div>
  );
};
