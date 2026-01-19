import { Typography } from '@mui/material';
import { Link } from 'react-router';

type EditButtonProps = {
  href: string;
};

const EditButton: React.FC<EditButtonProps> = ({ href }) => {
  return (
    <Typography
      component={Link}
      to={href}
      sx={(theme) => ({
        color: theme.palette.grey[300],
        textDecoration: 'underline',
        fontWeight: 500,
        textTransform: 'uppercase',
        cursor: 'pointer',
      })}
    >
      Edit
    </Typography>
  );
};

export default EditButton;
