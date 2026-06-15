import { Typography } from '@mui/material';
import { Link } from 'react-router';

type Props = {
  title?: string;
  href: string;
  color?: 'primary' | 'grey';
};

const EditButton: React.FC<Props> = ({ title = 'Edit', color = 'grey', href }) => {
  return (
    <Typography
      component={Link}
      to={href}
      sx={(theme) => ({
        color: color === 'grey' ? theme.palette.grey[300] : theme.palette.primary.main,
        textDecoration: 'underline',
        fontWeight: 500,
        textTransform: 'uppercase',
        cursor: 'pointer',
      })}
    >
      {title}
    </Typography>
  );
};

export default EditButton;
