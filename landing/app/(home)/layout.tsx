import { FloatingNav } from '@/components/nav/FloatingNav';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <FloatingNav />
      <main className="flex flex-1 flex-col" data-pagefind-body>
        {children}
      </main>
    </>
  );
}
