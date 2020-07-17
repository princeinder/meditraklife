import React, { useState } from "react";
import {
  Card,
  TablePagination,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PerfectScrollbar from "react-perfect-scrollbar";
import history from "history.js";

const useStyles = makeStyles((theme) => ({
  card: {
    // height: "640px"
  },
  ligthBgRow: {
    backgroundColor: "#f5f6fa",
  },
}));
const colorList = [
  "text-yellow-200",
  "text-yellow-400",
  "text-green-500",
  "text-red-600",
];

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "lastReview",
    numeric: false,
    label: "Last Review",
  },
  {
    id: "safetyIndex",
    numeric: true,
    label: "Safety Index",
  },
];
const avatarList = [
  "/assets/images/faces/2.jpg",
  "/assets/images/faces/3.jpg",
  "/assets/images/faces/4.jpg",
  "/assets/images/faces/5.jpg",
  "/assets/images/faces/9.jpg",
  "/assets/images/faces/10.jpg",
  "/assets/images/faces/11.jpg",
  "/assets/images/faces/12.jpg",
  "/assets/images/faces/13.jpg",
  "/assets/images/faces/15.jpg",
  "/assets/images/faces/16.jpg",
  "/assets/images/faces/17.jpg",
];
const patientList = [
  {
    avatarUrl: "/assets/images/faces/2.jpg",
    name: "John Buffet",
    safetyIndex: 3.4,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/3.jpg",
    name: "Benjamin Smith",
    safetyIndex: 1.4,
    lastReview: "03-12-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/4.jpg",
    name: "Michael Dean",
    safetyIndex: 3.43,
    lastReview: "03-24-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/5.jpg",
    name: "John Guy",
    safetyIndex: 4.4,
    lastReview: "03-15-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/9.jpg",
    name: "John Buffet",
    safetyIndex: 1.24,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/2.jpg",
    name: "John Buffet",
    safetyIndex: 0.4,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/10.jpg",
    name: "John Buffet",
    safetyIndex: 2.9,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/10.jpg",
    name: "John Buffet",
    safetyIndex: 3.4,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/12.jpg",
    name: "John Buffet",
    safetyIndex: 3.4,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/13.jpg",
    name: "John Buffet",
    safetyIndex: 3.4,
    lastReview: "03-03-2019 12:01:13 AM",
  },
  {
    avatarUrl: "/assets/images/faces/12.jpg",
    name: "John Buffet",
    safetyIndex: 0.4,
    lastReview: "03-03-2019 12:01:13 AM",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/* Custom function */

function getIconColor(safetyi) {
if(safetyi >= 0 && safetyi <= 3 )
  return colorList[3];
else if(safetyi > 3 && safetyi < 4 )
return colorList[1]; 
else if(safetyi >= 4 && safetyi <= 5 )
return colorList[2]; 
else
return colorList[0]; 
}
/* Custom function */

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className="px-0 text-gray-500" colSpan={2}></TableCell>
        <TableCell
          className="px-0 text-gray-500"
          colSpan={4}
          sortDirection={orderBy === headCells[0].id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCells[0].id}
            direction={orderBy === headCells[0].id ? order : "asc"}
            onClick={createSortHandler(headCells[0].id)}
          >
            {headCells[0].label}
            {/* {orderBy === headCells[0].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null} */}
          </TableSortLabel>
        </TableCell>
        <TableCell
          className="px-0 text-gray-500"
          colSpan={4}
          sortDirection={orderBy === headCells[1].id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCells[1].id}
            direction={orderBy === headCells[1].id ? order : "asc"}
            onClick={createSortHandler(headCells[1].id)}
          >
            {headCells[1].label}
            {/* {orderBy === headCells[1].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null} */}
          </TableSortLabel>
        </TableCell>
        <TableCell
          className="px-0 text-gray-500"
          colSpan={2}
          sortDirection={orderBy === headCells[2].id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCells[2].id}
            direction={orderBy === headCells[2].id ? order : "asc"}
            onClick={createSortHandler(headCells[2].id)}
          >
            {headCells[2].label}
            {/* {orderBy === headCells[2].id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null} */}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const TableCard = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = React.useState("safetyIndex");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
  };

  const { rowClickHandler } = props;
  return (
    <Card elevation={3} className={`p-5 mb-6 ${classes.card}`}>
      <div className="mb-3 px-6 flex justify-between">
        <div className="flex justify-center items-center ">
          <span className="card-title">Patients</span>
        </div>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="overflow-auto">
        <Table className="product-table">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={patientList.length}
          />
          <TableBody>
            {stableSort(patientList, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 == 0 ? classes.ligthBgRow : ""}`}
                  onClick={() =>
                    rowClickHandler({ id: index * 999, name: product.name })
                  }
                >
                  <TableCell className="capitalize" colSpan={2} align="left">
                    <div className="flex items-center">
                      <img
                        className="h-48 w-48 rounded-full mx-auto"
                        src={product.avatarUrl}
                        alt="user"
                      />
                    </div>
                  </TableCell>
                  <TableCell
                    className="px-0 capitalize"
                    colSpan={4}
                    align="left"
                  >
                    {product.name}
                  </TableCell>
                  <TableCell
                    className="px-0 capitalize"
                    align="left"
                    colSpan={4}
                  >
                    <span className="pr-2">{product.lastReview}</span>
                  </TableCell>

                  <TableCell className="px-0" align="left" colSpan={1}>
                    <span className="pr-8">
                      <strong>{product.safetyIndex}</strong>
                    </span>
                  </TableCell>

                  <TableCell className="px-0" align="left" colSpan={1}>
                    <IconButton>
                      <NotificationsIcon
                       className={getIconColor(product.safetyIndex)}
                       // className={`${colorList[Math.ceil(Math.random() * 3)]}`}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          className="px-4"
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={patientList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </Card>
  );
};

export default TableCard;
