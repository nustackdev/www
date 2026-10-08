import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { FloatingNav } from '@/components/nav/FloatingNav';

export default function Layout({ children }: LayoutProps<'/blog'>) {
  return (
    <HomeLayout {...baseOptions()} slots={{ header: FloatingNav }}>
      {children}
    </HomeLayout>
  );
}
