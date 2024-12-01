import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/clerk-react";
import { Link, Outlet } from "react-router-dom";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="py-4 px-3 md:px-10 h-screen flex flex-col">
        <header className="flex items-center justify-between">
          <Link to={"/"} className="flex font-bold items-center gap-2">
            <img src="/logo.png" alt="" width={32} height={32} />
            <span>Mehrzad AI</span>
          </Link>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-1 ">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
