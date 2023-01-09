import { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
} from "@mui/material";

export function TabTable(props) {
  const rows = props.rows;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [selected, setSelected] = useState(props.inventory);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, name) => {
    console.log(name);
    props.updateInventory(event, name);
  };

  const isSelected = (name) => props.inventory.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const tableRows = rows
    .sort()
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((ingredient, index) => {
      const isItemSelected = isSelected(ingredient);
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <TableRow
          hover
          onClick={(event) => handleClick(event, ingredient)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={ingredient}
          selected={isItemSelected}
        >
          <TableCell key={ingredient}>{ingredient}</TableCell>
        </TableRow>
      );
    });

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ height: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
