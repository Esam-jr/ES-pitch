import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-4 bg-white border-b border-accent-200 shadow-lg font-work-sans backdrop-blur-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-primary-600 hover:shadow-lg transition-all duration-200 ease-in-out">
                  Create
                </span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="max-sm:hidden text-error-600 hover:text-white px-4 py-2 rounded-lg font-semibold hover:bg-error-500 hover:shadow-lg transition-all duration-200 ease-in-out"
                >
                  Logout
                </button>
                <LogOut className="size-6 sm:hidden text-error-500 hover:text-error-600 transition-colors duration-200" />
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-primary-600 hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
