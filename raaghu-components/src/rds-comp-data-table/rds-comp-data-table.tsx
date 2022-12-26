import { MouseEvent, useState, useEffect } from "react";
import {
  RdsIcon,
  RdsCheckbox,
  RdsButton,
  RdsPagination,
  RdsAvatar,
} from "../rds-elements";
import "./rds-comp-data-table.scss";

export interface RdsCompDatatableProps {
  enablecheckboxselection?: boolean;
  classes?: string;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number;
    required?: boolean;
    sortable?: boolean;
    colWidth?: string;
    disabled?: boolean;
    isEndUserEditing?: boolean;
  }[];
  actions?: {
    displayName: string;
    id: string;
  }[];
  tableData: any[];
  pagination: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection(arg: any): any;

  // onSortSelection(arg: {
  // 	sortClickEvent: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>;
  // 	sortOrder: string;
  // }): void;
}
const RdsCompDatatable = (props: RdsCompDatatableProps) => {
  const [data, setData] = useState(props.tableData);
  const [rowStatus, setRowStatus] = useState({
    startingRow: 0,
    endingRow: props.recordsPerPage,
  });
  let sort: boolean;
  useEffect(() => {
    if (!sort) {
      setData(props.tableData);
    }
  }, [props.tableData]);

  const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
    setRowStatus({
      startingRow: (currentPage - 1) * recordsPerPage, //0-index
      endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
    });
  };
  const actionOnClickHandler = (
    clickEvent: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    tableDataRow: any,
    tableDataRowIndex: number,
    action: { displayName: string; id: string }
  ) => {
    props.onActionSelection({
      event: clickEvent,
      clickedRowTableData: tableDataRow,
      tableDataRowIndex: tableDataRowIndex,
      actionClicked: action,
    });
  };


  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = data.map((user) => {
        return { ...user, selected: checked };
      });
      setData(tempUser);
    } else {
      let tempUser = data.map((user) =>
        user.id == name ? { ...user, selected: checked } : user
      );
      setData(tempUser);
    }
  };

  const onSortClickHandler = (
    event: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    sortOrder: string,
    col: string
  ) => {
    const sorted = [...data].sort((a, b) => {
      if (a[col] === undefined) return 1;
      if (b[col] === undefined) return -1;
      if (a[col] === undefined && b[col] === undefined) return 0;
      return (
        a[col].toString().localeCompare(b[col].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "ascending" ? 1 : -1)
      );
    });
    setData(sorted);
    sort = true;
  };
  let Classes = props.classes || " table-hover table-bordered";
  console.log("props.tableData ", data)
  return (
    <>
      <div className="RdsCompDataTable sm-datatable table-responsive">
        <table
          className={`table h-100 ${Classes}`}
          id="sortTable"
          width="400px"
        >
          <thead>
            <tr>
              {props.enablecheckboxselection && (
              <th scope="col" className="checkbox-Style-class">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="allSelect"
                    checked={
                      data.filter((user) => user?.selected == true).length ==
                      data.length
                    }
                    onChange={handleChange}
                  />
           
            </th>
              )}
              {props.tableHeaders.map((tableHeader, index) => (
                <th key={"tableHeader-" + index}>
                  <span>{tableHeader.displayName}</span>
                  {tableHeader.sortable && (
                    <span className="px-2">
                      <span
                        className="btn btn-sm px-0"
                        onClick={(e) =>
                          onSortClickHandler(e, "ascending", tableHeader.key)
                        }
                      >
                        <RdsIcon
                          name={"up"}
                          height="12px"
                          width="12px"
                          stroke={true}
                        />
                      </span>
                      <span
                        className="btn btn-sm px-0"
                        onClick={(e) =>
                          onSortClickHandler(e, "descending", tableHeader.key)
                        }
                      >
                        <RdsIcon
                          name={"down"}
                          height="12px"
                          width="12px"
                          stroke={true}
                        />
                      </span>
                    </span>
                  )}
                </th>
              ))}
              {props.tableHeaders &&
                props.tableHeaders.length > 0 &&
                props.actions &&
                props.actions.length > 0 && (
                  <th className="text-center">Actions</th>
                )}
            </tr>
          </thead>
          <tbody>
            {data.map(
              (tableDataRow, index) =>
                (props.pagination
                  ? typeof rowStatus.endingRow != "undefined" &&
                    index >= rowStatus.startingRow &&
                    index < rowStatus.endingRow
                  : true) && (
                  <tr key={"tableRow-" + index}>
                    {props.enablecheckboxselection &&  <th scope="row" className="checkbox-Style-class">
                   
                      <input
                        type="checkbox"
                        name={tableDataRow.id}
                        onChange={handleChange}
                        checked={tableDataRow.selected}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                      />
                    </th>}
                    {props.tableHeaders.map((tableHeader, tableHeaderIndex) => (
                      <td
                        key={
                          "column-" +
                          tableHeaderIndex +
                          "-inside-tableRow" +
                          index
                        }
                      >
                        <div>
                          {tableHeader.datatype === "text" &&
                            tableDataRow[tableHeader.key]}
                          {tableHeader.datatype === "number" &&
                            tableDataRow[tableHeader.key]}
                          {tableHeader.datatype === "badge" && (
                            <span
                              className={
                                "badge text-bg-" +
                                (tableDataRow[tableHeader.key].badgeColorVariant
                                  ? tableDataRow[tableHeader.key]
                                      .badgeColorVariant
                                  : "primary")
                              }
                            >
                              {tableDataRow[tableHeader.key].content
                                ? tableDataRow[tableHeader.key].content
                                : tableDataRow[tableHeader.key]}
                            </span>
                          )}
                          {tableHeader.datatype === "avatarTitleInfo" && (
                            <div className="avatarTitleInfo">
                              <RdsAvatar
                                withProfilePic={true}
                                profilePic={
                                  tableDataRow[tableHeader.key].avatar
                                }
                                isTitle={true}
                                firstName={
                                  tableDataRow[tableHeader.key].title
                                    ? tableDataRow[tableHeader.key].title
                                    : tableDataRow[tableHeader.key]
                                }
                                role={tableDataRow[tableHeader.key].info}
                              />
                            </div>
                          )}
                          {tableHeader.datatype === "iconAvatarTitle" && (
                            <div className="iconAvatarTitle ">
                              <div className="col-1 me-2">
                                <RdsIcon
                                  name={tableDataRow[tableHeader.key].iconName}
                                  fill={tableDataRow[tableHeader.key].iconFill}
                                  stroke={
                                    tableDataRow[tableHeader.key].iconStroke
                                  }
                                  colorVariant={
                                    tableDataRow[tableHeader.key].iconColor
                                  }
                                  width={
                                    tableDataRow[tableHeader.key].iconWidth
                                  }
                                  height={
                                    tableDataRow[tableHeader.key].iconHeight
                                  }
                                />
                              </div>
                              {tableDataRow[tableHeader.key].withavatar && (
                                <div>
                                  <div className="col-5">
                                    <RdsAvatar
                                      withProfilePic={true}
                                      profilePic={
                                        tableDataRow[tableHeader.key].avatar
                                      }
                                      isTitle={false}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label>
                                      {tableDataRow[tableHeader.key].title}{" "}
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          {tableHeader.datatype === "children" && (
                            <div> {tableDataRow[tableHeader.key].children}</div>
                          )}
                          {/* add more types here if reequired */}
                        </div>
                      </td>
                    ))}
                    {props.actions && props.actions.length > 0 && (
                      <td className="align-middle text-center">
                        {!tableDataRow.isEndUserEditing ? (
                          <div className="dropdown">
                            <button
                              className="btn"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <RdsIcon
                                name={"three_dots"}
                                height="14px"
                                width="14px"
                                stroke={true}
                                fill={true}
                                class="bi bi-three-dots-vertical"
                              />
                            </button>
                            <ul className="dropdown-menu RdsCompDataTable__Actions__Ul">
                              {props.actions.map((action, actionIndex) => (
                                <li
                                  key={
                                    "action-" +
                                    actionIndex +
                                    "-inside-tableRow" +
                                    index
                                  }
                                >
                                  <a
                                    onClick={(e) => {
                                      actionOnClickHandler(
                                        e,
                                        tableDataRow,
                                        index,
                                        action
                                      );
                                    }}
                                    className="dropdown-item"
                                  >
                                    {action.displayName}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="d-flex">
                            <RdsButton
                              class="action"
                              colorVariant="primary"
                              size="medium"
                              tooltipTitle={""}
                              type={"button"}
                            >
                              <RdsIcon
                                name={"check"}
                                height="14px"
                                width="14px"
                                stroke={true}
                                fill={true}
                                class="bi bi-check2"
                              />
                            </RdsButton>
                            <RdsButton
                              class="ms-2 text-white"
                              colorVariant="danger"
                              tooltipPlacement="top"
                              size="medium"
                              tooltipTitle={""}
                              type={"button"}
                            >
                              <RdsIcon
                                name={"close"}
                                height="14px"
                                width="14px"
                                stroke={true}
                                fill={true}
                                class="bi bi-close"
                              />
                            </RdsButton>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>

      {props.pagination && (
        <div className="RdsCompDataTable__RdsPagination d-flex justify-content-end ">
          <RdsPagination
            totalRecords={props.tableData.length}
            recordsPerPage={props.recordsPerPage ? props.recordsPerPage : 5}
            onPageChange={onPageChangeHandler}
            paginationType={
              props.recordsPerPageSelectListOption ? "advance" : "default"
            }
          ></RdsPagination>
        </div>
      )}
    </>
  );
};
export default RdsCompDatatable;