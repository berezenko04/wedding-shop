import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// utils
import { calcFinalPrice } from '@/utils/calcFinalPrice';

// types
import { OrderItem } from '@/api/orders/orders.types';

type ProductsTableProps = {
  items: OrderItem[];
};

const ProductsTable: React.FC<ProductsTableProps> = ({ items }) => {
  const columns = [
    { sx: { minWidth: 280 }, title: 'Product' },
    { sx: { minWidth: 60 }, title: 'Size' },
    { sx: { minWidth: 80 }, title: 'Qty' },
    { sx: { minWidth: 100 }, title: 'Price' },
    { sx: { minWidth: 80 }, title: 'Discount' },
    { sx: { minWidth: 100 }, title: 'Total' },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(({ sx, title }) => (
            <TableCell key={title} sx={sx}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(({ id, product, size, quantity, price, discount }) => (
          <TableRow key={id}>
            <TableCell>
              <Stack flexDirection="row" alignItems="flex-start" gap={2}>
                <Box component="img" src={product.posterUrl} sx={{ width: 64, height: 64, objectFit: 'cover' }} />
                {product.title}
              </Stack>
            </TableCell>
            <TableCell>{size || 'Accessory'}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{price.toFixed(2)} USD</TableCell>
            <TableCell>{discount != null ? `${discount * 100}%` : '—'}</TableCell>
            <TableCell>{(calcFinalPrice(price, discount) * quantity).toFixed(2)} USD</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
