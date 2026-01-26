import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const LinkBehavior = forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => {
  const { href, to, ...other } = props as RouterLinkProps & { href?: RouterLinkProps['to'] };
  return <RouterLink ref={ref} to={to ?? (href as RouterLinkProps['to'])} {...other} />;
});
