import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className, onClick, ...props }: LinkProps) {
  const { navigate, path } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    // Don't intercept if modifier keys are pressed or external links
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    e.preventDefault();
    navigate(href);
  };

  const isActive = path === href;

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      data-active={isActive ? 'true' : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
