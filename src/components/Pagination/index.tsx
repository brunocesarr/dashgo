import { Box, Stack } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

export function Pagination() {
  return (
    <Stack direction="row" mt="8" justify="space-between" align="center">
      <Box>
        <b>0</b> - <b>10</b> of <b>100</b>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationItem isCurrent number={1} />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
      </Stack>
    </Stack>
  );
}
