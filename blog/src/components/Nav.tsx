import { ThemeProvider } from '@www/shared/components/nav/ThemeProvider';
import { PlainNav } from '@www/shared/components/nav/PlainNav';

/** The site nav as a blog island, inside the theme context the shared kit expects. */
export default function Nav() {
  return (
    <ThemeProvider>
      <PlainNav />
    </ThemeProvider>
  );
}
