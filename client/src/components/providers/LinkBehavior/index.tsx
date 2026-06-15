import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type Props = RouterLinkProps & {
  href?: RouterLinkProps['to'];
  ref?: React.Ref<HTMLAnchorElement>;
};

export function LinkBehavior({ href, to, ref, ...other }: Props) {
  return <RouterLink ref={ref} to={to ?? (href as RouterLinkProps['to'])} {...other} />;
}
