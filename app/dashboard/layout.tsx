import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Middleware already gates /dashboard/*, but guard here too so TS knows
  // the session is non-null and direct-renders stay safe.
  if (!session?.user) {
    redirect("/login?next=/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[rgb(var(--background))]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title="Dashboard"
          user={{
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            plan: session.user.plan,
          }}
        />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
