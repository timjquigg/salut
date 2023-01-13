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
  // console.log(props)
  const rows = props.rows;
  const category = props.category;

  const { inventory, updateInventory } = useContext(inventoryContext);

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (event, name) => {
    updateInventory(name);
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
          style={{ maxhHeight: '70vh' }}
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
    <Box sx={{ width: {md: "30vw", xs: "60vw"}, pt: {xs: '20px'}, padding: {sm: '30px'}, paddingRight: {lg: '50px', xs: '5px'}}}>
      <TableContainer sx={{ height: "100%" }}>
        <Table>
          {/* <TableHead sx={{ width: '100%', textAlign: 'center', justifySelf: 'center'}}>
            
              {category}
            
          </TableHead> */}
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
