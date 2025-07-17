import { UserNav } from "@/components/common/UserNav";
import { MountainIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">MC Panel</span>
        </Link>
        <div className="ml-auto">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
