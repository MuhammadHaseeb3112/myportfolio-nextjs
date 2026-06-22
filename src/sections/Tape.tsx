import StarIcon from "@/assets/icons/star.svg";
import { Fragment } from "react";

const words = [
  "performance",
  "responsive",
  "scalable",
  "modern",
  "accessible",
  "progressive",
  "intuitive",
  "accessible",
  "User-Friendly",
  "Robust",
  "Reliable",
  "Secure",
  "performant",
  "responsive",
  "scalable",
  "modern",
  "accessible",
  "progressive",
  "intuitive",
  "accessible",
  "User-Friendly",
  "Robust",
  "Reliable",
  "Secure",
];
export const TapeSection = () => {
  return (
    <div className="py-16 lg:py-24 overflow-x-clip">
      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 -rotate-3 -mx-1">
        <div className="flex flex-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-4 py-3 pr-4 animate-move-left [animation-duration:30s]">
            {words.map((word, index) => (
              <Fragment key={index}>
                <span className="text-gray-900 text-sm inline-flex items-center uppercase font-extrabold">
                  {word}
                </span>
                <StarIcon className="size-6 text-gray-900 rotate-12 " />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
