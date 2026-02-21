import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-[#F9FAFB] overflow-auto">
        <div className="pt-18 md:pt-0">
          <div className="p-4 sm:p-6 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
