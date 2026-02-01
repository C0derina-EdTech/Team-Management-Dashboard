import { Link } from "@tanstack/react-router";
import { Logo } from "@coderina-ams/ui/components/logo";
import { MobileMenu } from "./mobile-menu";

export const NavHeader = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full px-8">
      <header className="flex items-center justify-between container">
        <Logo href="/" className="w-[100px] md:w-[120px]" />
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {["About", "Portfolio", "Insights", "Contact"].map((item) => (
            <Link
              className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
              to={`/`}
              //   to={`#${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>
        <Link className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80" to="/">
          Sign In
        </Link>
        <MobileMenu />
      </header>
    </div>
  );
};
