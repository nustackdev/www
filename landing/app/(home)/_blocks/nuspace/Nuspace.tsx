import { BookOpen, Ellipsis, House, Keyboard, Moon, Package, PanelLeft, Plus, Search, Settings, Sun } from 'lucide-react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { GithubMark } from '@www/shared/components/marks/GithubMark';
import { cn } from '@www/shared/lib/cn';
import s from './Nuspace.module.css';

/** One plane in the sidebar's tree. */
export interface PlaneRow {
  id: string;
  /** An emoji or a lucide glyph, like a plane's own icon. */
  icon: ReactNode;
  label: ReactNode;
  /** Nesting, 0 at the top level. */
  depth?: number;
  /** The open plane: washed, its label a tier up. */
  sel?: boolean;
  className?: string;
  iconClassName?: string;
  /** Anything after the label, eg a tag. */
  end?: ReactNode;
}

type Nav = 'home' | 'search' | 'settings';

const NAV: { id: Nav; label: string; icon: ReactNode; keys?: string }[] = [
  { id: 'home', label: 'Home', icon: <House /> },
  { id: 'search', label: 'Search', icon: <Search />, keys: '⌘K' },
  { id: 'settings', label: 'Settings', icon: <Settings />, keys: '⌘,' },
];

export interface NuspaceWindowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The tree under Planes, flat and in drawing order. */
  planes: PlaneRow[];
  /** Packages under Extensions, folded. None hides the section. */
  extensions?: string[];
  /** A nav row that is the open plane. */
  nav?: Nav;
  /** The plane's top bar, left. */
  crumb?: ReactNode;
  /** The plane itself. */
  children?: ReactNode;
}

/**
 * NuspaceWindow: the nuspace shell as the site draws it, after the app's
 * rail (nuspace-ui sidebar/Rail.tsx): a top bar, the nav rows, Planes with
 * its New plane row and the tree, Extensions, a bottom bar; the open plane
 * beside it. Content comes in as props and children; it never moves.
 */
export function NuspaceWindow({ planes, extensions, nav, crumb, className, children, ...rest }: NuspaceWindowProps) {
  return (
    <div className={cn(s.root, className)} {...rest}>
      <aside className={s.rail}>
        <div className={s.top}>
          <span className={s.btn}>
            <PanelLeft aria-hidden />
          </span>
          <span className={s.mark}>
            <b>nu</b>space
          </span>
          <span className={cn(s.btn, s.end)}>
            <Plus aria-hidden />
          </span>
        </div>

        <div className={s.body}>
          {NAV.map((n) => (
            <div key={n.id} className={cn(s.row, n.id === nav && s.sel)}>
              <span className={s.ic}>{n.icon}</span>
              <span className={s.label}>{n.label}</span>
              {n.keys ? <kbd className={s.keys}>{n.keys}</kbd> : null}
            </div>
          ))}

          <div className={s.section}>Planes</div>
          <div className={cn(s.row, s.newRow)}>
            <span className={s.ic}>
              <Plus />
            </span>
            <span className={s.label}>New plane</span>
          </div>
          {planes.map((p) => (
            <div
              key={p.id}
              className={cn(s.row, p.sel && s.sel, p.className)}
              style={{ '--d': p.depth ?? 0 } as CSSProperties}
            >
              <span className={cn(s.ic, p.iconClassName)}>{p.icon}</span>
              <span className={s.label}>{p.label}</span>
              {p.end}
            </div>
          ))}

          {extensions?.length ? (
            <>
              <div className={s.section}>Extensions</div>
              {extensions.map((x) => (
                <div key={x} className={s.row}>
                  <span className={s.ic}>
                    <Package />
                  </span>
                  <span className={s.label}>{x}</span>
                </div>
              ))}
            </>
          ) : null}
        </div>

        <div className={s.foot}>
          <span className={s.btn}>
            <GithubMark size={15} />
          </span>
          <span className={s.btn}>
            <BookOpen aria-hidden />
          </span>
          <span className={s.btn}>
            <Keyboard aria-hidden />
          </span>
          <span className={cn(s.btn, s.end)}>
            <i className={s.dot} />
          </span>
          <span className={s.btn}>
            <Sun className={s.sun} aria-hidden />
            <Moon className={s.moon} aria-hidden />
          </span>
        </div>
      </aside>

      <div className={s.doc}>
        <div className={s.bar}>
          {crumb}
          <Ellipsis className={s.more} aria-hidden />
        </div>
        {children}
      </div>
    </div>
  );
}

/** PlaneTitle: a plane's big icon and name, the first thing on it. */
export function PlaneTitle({
  icon,
  className,
  picClassName,
  children,
}: {
  icon: ReactNode;
  className?: string;
  picClassName?: string;
  children: ReactNode;
}) {
  return (
    <h4 className={cn(s.title, className)}>
      <span className={cn(s.pic, picClassName)}>{icon}</span>
      {children}
    </h4>
  );
}
