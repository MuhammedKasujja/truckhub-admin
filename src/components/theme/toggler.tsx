"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// import { MoonIcon, SunIcon } from "lucide-react";
// import { useTheme } from "next-themes";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// type ThemeTogglerProps = {
//   className?: string;
// };

// export default function ThemeToggler({ className }: ThemeTogglerProps) {
//   const { resolvedTheme, setTheme } = useTheme();

//   const switchTheme = () => {
//     setTheme(resolvedTheme === "dark" ? "light" : "dark");
//   };

//   const toggleTheme = () => {
//     //@ts-ignore
//     if (!document.startViewTransition) switchTheme();

//     //@ts-ignore
//     document.startViewTransition(switchTheme);
//   };

//   return (
//     <Button
//       onClick={toggleTheme}
//       variant="outline"
//       size="icon"
//       className={cn("rounded-full", className)}
//     >
//       <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//       <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   );
// }