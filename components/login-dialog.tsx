import { signIn } from "@/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
        Login
      </DialogTrigger>
      <DialogContent className="max-w-md gap-8">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center">Login</DialogTitle>
          <DialogDescription className="text-center">
            Please sign in to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              className="flex w-full items-center justify-center gap-2 rounded border border-none bg-white px-12 py-2 text-sm font-medium text-black hover:bg-white/90"
              type="submit"
            >
              <Image
                className="h-4 w-4"
                src="/google.webp"
                height="96"
                width="96"
                alt="Google oauth"
              />
              Signin with Google
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
