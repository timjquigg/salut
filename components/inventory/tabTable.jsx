import { useState, useContext } from "react";
import { inventoryContext } from "../../providers/InventoryProvider";
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
  Checkbox,
} from "@mui/material";

export function TabTable(props) {
  const rows = props.rows;

  const { inventory, updateInventory } = useContext(inventoryContext);

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (event, name) => {
    updateInventory(event, name);
  };

  const isSelected = (name) => inventory.indexOf(name) !== -1;

  const getEmptyRows = () => {
    if (rows.length > rowsPerPage) {
      if (page > 0) {
        return page > 0
          ? Math.max(0, (1 + page) * rowsPerPage - rows.length)
          : 0;
      }
    }
    return rowsPerPage - rows.length;
  };

  const emptyRows = getEmptyRows();

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
          style={{ height: 53 }}
        >
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
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
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}
