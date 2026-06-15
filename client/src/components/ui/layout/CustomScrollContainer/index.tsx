import { useEffect, useRef, useState } from 'react';
import { Stack, SxProps, Theme } from '@mui/material';

type Props = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

const CustomScrollContainer: React.FC<Props> = ({ children, sx }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => setHasScroll(el.scrollHeight > el.clientHeight);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Stack
      ref={ref}
      sx={[
        (theme: Theme) => ({
          overflowY: 'auto',
          overflowX: 'hidden',
          minWidth: 0,
          pr: hasScroll ? '0px !important' : undefined,

          '&::-webkit-scrollbar': {
            width: 32,
            height: 32,
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            border: '12px solid transparent',
            backgroundClip: 'content-box',
          },

          '&::-webkit-scrollbar-button': {
            display: 'none',
            height: 0,
            width: 0,
          },
        }),
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      {children}
    </Stack>
  );
};

export default CustomScrollContainer;
