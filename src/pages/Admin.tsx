import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminArticles } from '@/components/admin/AdminArticles';
import { AdminAppointments } from '@/components/admin/AdminAppointments';
import { AdminUsers } from '@/components/admin/AdminUsers';

export default function Admin() {
  return (
    <AdminGuard>
      <AdminLayout>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="artigos" element={<AdminArticles />} />
          <Route path="consultas" element={<AdminAppointments />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </AdminGuard>
  );
}
