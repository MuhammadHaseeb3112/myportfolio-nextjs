const menuitems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Projects",
    path: "/#projects",
  },
  {
    name: "About",
    path: "/#about",
  },
  {
    name: "Contact",
    path: "/#contact",
  },
];

export const Header = () => {
  return (
    <div className="flex justify-center items-center top-3 fixed w-full z-10">
      <nav className=" flex gap-1 p-0.5 border-white/10 rounded-full bg-white/10 backdrop:blue ">
        {menuitems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`nav-item hover:bg-white/20 hover:underline underline-offset-4 hover:text-white rounded-full`}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};
