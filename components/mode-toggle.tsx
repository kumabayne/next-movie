"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleChange() {
    if (theme === "light") {
      setTheme("dark");
      return;
    }

    if (theme === "dark") {
      setTheme("light");
      return;
    }
  }

  return (
    <div className="flex gap-2 items-center justify-end">
      <Switch
        id="mode-toggle"
        checked={theme === "light" ? false : true}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="mode-toggle">
        {theme === "light" ? (
          <IconSun className="w-4 h-4" />
        ) : (
          <IconMoon className="w-4 h-4" />
        )}
        <span className="sr-only">Toggle Mode</span>
      </Label>
    </div>
  );
}
