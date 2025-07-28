import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <Link href="/" className="navbar-logo">
          <Image 
            src="/logo.png" 
            alt="ES Pitch Logo" 
            width={144} 
            height={30}
            className="h-8 w-auto"
          />
        </Link>

        <div className="navbar-actions">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="navbar-button mobile-hidden">
                Create Pitch
              </Link>
              
              <Link href="/startup/create" className="mobile-only">
                <BadgePlus className="w-6 h-6 text-primary-600" />
                <span className="sr-only">Create Pitch</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="navbar-button-secondary mobile-hidden focus-ring"
                >
                  Sign Out
                </button>
                
                <button
                  type="submit"
                  className="mobile-only p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200 focus-ring"
                >
                  <LogOut className="w-5 h-5 text-error-500" />
                  <span className="sr-only">Sign Out</span>
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className="focus-ring rounded-full">
                <Avatar className="navbar-avatar">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "User Avatar"}
                  />
                  <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
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
                className="navbar-button focus-ring"
              >
                Sign In with GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;