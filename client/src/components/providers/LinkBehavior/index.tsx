import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkBehaviorProps = RouterLinkProps & {
  href?: RouterLinkProps['to'];
  ref?: React.Ref<HTMLAnchorElement>;
};

export function LinkBehavior({ href, to, ref, ...other }: LinkBehaviorProps) {
  return <RouterLink ref={ref} to={to ?? (href as RouterLinkProps['to'])} {...other} />;
}
