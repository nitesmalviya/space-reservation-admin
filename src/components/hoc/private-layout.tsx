import { Sidebar } from "@/components/hoc/sidebar";

export default function PrivateLayout({
  children,
}: {
 readonly children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64">{children}</main>
    </div>
  );
}
