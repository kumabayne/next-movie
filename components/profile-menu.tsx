import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { signOut } from "@/auth";

export default function ProfileMenu({
  fallback,
  src,
}: {
  fallback: string;
  src: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar fallback={fallback} src={src} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 min-w-48" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="block cursor-pointer" href="/profile">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="block cursor-pointer" href="/watchlist">
            Watchlist
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="block cursor-pointer" href="/settings">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async (formData) => {
              "use server";
              await signOut();
            }}
            className="!px-0 !py-0"
          >
            <button
              className="block grow cursor-pointer px-2 py-1.5 text-left"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
