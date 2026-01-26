import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

const Order: React.FC = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography component="span">Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo
        lobortis eget.
      </AccordionDetails>
    </Accordion>
  );
};

export default Order;
