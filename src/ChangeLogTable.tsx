import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { grey } from "@mui/material/colors";

export default function ChangeLogTable({
  changelog,
}: {
  changelog: FeatureChange[];
}) {
  return (
    <TableContainer component={Paper} sx={{ bgcolor: grey[900], mt: 2 }}>
      <Table aria-label="changelog" sx={{ "th, td": { color: grey[400] } }}>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="col">
              Change
            </TableCell>
            <TableCell component="th" scope="col">
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {changelog.map((change, index) => (
            <TableRow key={index} sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>{change.changeText}</TableCell>
              <TableCell>{change.changeDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
