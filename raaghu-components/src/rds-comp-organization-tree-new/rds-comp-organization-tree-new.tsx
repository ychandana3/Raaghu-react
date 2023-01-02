import { intlFormatDistance } from "date-fns";
import { useState, useEffect, useLayoutEffect } from "react";
import RdsCompAlertPopup from "../rds-comp-alert-popup/rds-comp-alert-popup";
import { RdsIcon, RdsButton, RdsOffcanvas, RdsInput } from "../rds-elements";
import "./rds-comp-organization-tree-new.scss";

export interface RdsComporganizationTreeNewProps {
  data: any[];
  inputLabel?: string;
  CanvasTitle?: string;
  AddUnitlabel?: string;
}

const RdsComporganizationTreeNew = (props: RdsComporganizationTreeNewProps) => {
  const [Odata, setOdata] = useState(props.data);
  const [Tdata, setTdata] = useState(props.data);

  const hasChild = props.data.length === 0 ? false : true;

  useLayoutEffect(() => {
    console.log("parentjusrerendered");
    setTdata(Odata);
  });

  const addunit = (e: any, key: any) => {
    console.log("unit added");
    console.log(key);
    setOdata([
      ...Odata,
      { key: "hello", label: "hello", title: "Documents Folder" },
    ]);
  };

  let name: string;
  const onChange = (e: any) => {
    name = e.target.value;
  };

  return (
    <>
      <ul className="parent" style={{ listStyle: "none" }}>
        {hasChild && <div className="vertical"></div>}
        {Tdata.map((tree) => (
          <>
            <TreeNode
              key={tree.key}
              node={tree}
              inputlabel={props.inputLabel}
              canvasTitle={props.CanvasTitle}
              addUnitlabel={props.AddUnitlabel}
            ></TreeNode>
          </>
        ))}
        {hasChild && <div style={{ height: "40px" }}></div>}
      </ul>

      <div>
        {hasChild && (
          <div>
            <div className="add">
              {" "}
              {Tdata[Tdata.length - 1] && (
                <div>
                  <div>
                    {hasChild && (
                      <div>
                        <div className="add">
                          {" "}
                          {Tdata[Tdata.length - 1] && (
                            <RdsButton
                              iconHeight="10px"
                              iconWidth="10px"
                              iconColorVariant="dark"
                              type={"button"}
                              icon={"Plus"}
                              size={"small"}
                              colorVariant={"primary"}
                              label={props.AddUnitlabel}
                              onClick={(event) =>
                                addunit(event, Tdata[Tdata.length - 1])
                              }
                            ></RdsButton>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const TreeNode = ({
  node,
  inputlabel,
  canvasTitle,
  addUnitlabel,
}: {
  node: any;
  inputlabel: any;
  canvasTitle: any;
  addUnitlabel: any;
}) => {
  const [newData, setnewData] = useState(node);
  const [Edit, setEdit] = useState("");
  const hasChild = newData.children ? true : false;

  // const addunit = (e: any, key: any) => {
  //   console.log("unit added");
  //   console.log(key);
  //   console.log("data remain", newData);

  //   setnewData({
  //     ...newData,
  //     children: [
  //       ...newData.children,
  //       { key: "0-1-5", label: "Document-0-5.doc", title: "Documents Folder" },
  //     ],
  //   });

  //   // setnewData([...newData.children, { key: "3-1", label: "hello", title: "Documents Folder" },
  //   // ]);
  // };

  useEffect(() => {
    console.log(node);
    console.log("child has rendered");
  });

  // useEffect(() => {
  //   console.log("child console run", newData);
  // }, newData);

  function editunit(key: any, label: any): void {
    console.log("edit value", Edit);
    console.log(key, "is being edited");
    console.log(label);
    setEdit(label);
  }

  let name: string;
  const onChange = (e: any) => {
    name = e.target.value;
  };
  const onSaveHandler = (elementid: string) => {
    console.log("new name is ", name);
    console.log("id", elementid);
    if (name) {
      setnewData({ ...newData, label: name });
    }

    console.log("New data", newData);
  };

  const deleteunit = (key: any) => {
    console.log(key, "is being deleted");
    if (newData.key === key) {
      console.log("newDatakey", newData.key);
      setnewData("");
    }
  };

  return (
    <>
      {" "}
      {newData && (
        <div>
          {" "}
          <div style={{ height: "20px" }}></div>
          <li key={newData.key}>
            <div>
              <div
                className={`${
                  newData
                    ? `${newData.key.length === 1 ? " " : "horizontal"}`
                    : ""
                }`}
              ></div>
              <div className="d-flex">
                <div>
                  <RdsIcon
                    name="circle"
                    fill={false}
                    stroke={true}
                    width="10px"
                    height="10px"
                    colorVariant={`${
                      newData.key.length === 1
                        ? "success"
                        : `${
                            newData.key.length === 3
                              ? "primary"
                              : `${
                                  newData.key.length === 5
                                    ? "warning"
                                    : `${
                                        newData.key.length === 7
                                          ? "danger"
                                          : "secondary"
                                      }`
                                }`
                          }`
                    }`}
                    background={`${
                      newData.key.length === 1
                        ? "success"
                        : `${
                            newData.key.length === 3
                              ? "primary"
                              : `${
                                  newData.key.length === 5
                                    ? "warning"
                                    : `${
                                        newData.key.length === 7
                                          ? "danger"
                                          : "secondary"
                                      }`
                                }`
                          }`
                    }`}
                    borderRadius="28px"
                  ></RdsIcon>
                  {"    "}
                  {newData.label}
                  {"  "}
                </div>
                {"  "}
                <div className="icons">
                  {"  "}
                  <div
                    className="icon edit"
                    // onClick={(event) => editunit(event, node.key, node.label)}
                  >
                    {" "}
                    <div className="plus">
                      <RdsOffcanvas
                        placement="end"
                        canvasTitle={canvasTitle}
                        width="500px"
                        id={`${node.key}`}
                        onclick={() => editunit(newData.key, newData.label)}
                        offcanvasbutton={
                          <RdsIcon
                            name={"plus"}
                            height="15px"
                            width="17px"
                            stroke={true}
                          ></RdsIcon>
                        }
                      >
                        <RdsInput
                          label={inputlabel}
                          labelPositon="top"
                          id={newData.key}
                          redAsteriskPresent={true}
                          name={Edit}
                          size="medium"
                          onChange={onChange}
                        ></RdsInput>
                        <div
                          className="d-flex"
                          style={{ position: "absolute", bottom: "5%" }}
                        >
                          <div className="me-3">
                            <RdsButton
                              type={"button"}
                              label="cancel"
                              colorVariant="primary"
                            ></RdsButton>
                          </div>
                          <RdsButton
                            type={"button"}
                            label="save"
                            colorVariant="primary"
                            onClick={() => onSaveHandler(newData.key)}
                          ></RdsButton>
                        </div>
                      </RdsOffcanvas>{" "}
                    </div>
                    <RdsOffcanvas
                      placement="end"
                      canvasTitle={canvasTitle}
                      width="500px"
                      id={`${node.key}`}
                      onclick={() => editunit(newData.key, newData.label)}
                      offcanvasbutton={
                        <RdsIcon
                          name={"pencil"}
                          width="15px"
                          height="15px"
                          stroke={true}
                        ></RdsIcon>
                      }
                    >
                      <RdsInput
                        label={inputlabel}
                        labelPositon="top"
                        id={newData.key}
                        redAsteriskPresent={true}
                        name={Edit}
                        value={Edit}
                        size="medium"
                        onChange={onChange}
                      ></RdsInput>
                      <div
                        className="d-flex"
                        style={{ position: "absolute", bottom: "5%" }}
                      >
                        <div className="me-3">
                          <RdsButton
                            type={"button"}
                            label="cancel"
                            colorVariant="primary"
                          ></RdsButton>
                        </div>
                        <RdsButton
                          type={"button"}
                          label="save"
                          colorVariant="primary"
                          onClick={() => onSaveHandler(newData.key)}
                        ></RdsButton>
                      </div>
                    </RdsOffcanvas>
                  </div>
                  {"   "}
                  <div className="icon delete">
                    <RdsCompAlertPopup
                      id={newData.key}
                      alertbutton={
                        <RdsIcon
                          name={"delete"}
                          height="16px"
                          width="20px"
                          stroke={true}
                        ></RdsIcon>
                      }
                      ondelete={() => deleteunit(newData.key)}
                    ></RdsCompAlertPopup>
                  </div>
                </div>
              </div>

              {/* <div>
                <div className="add">
                  {" "}
                  <div>
                    <div>
                      <div className="add">
                        {" "}
                        <RdsButton
                          type={"button"}
                          icon={"Plus"}
                          size={"small"}
                          colorVariant={"primary"}
                          iconColorVariant={"light"}
                          label="hello"
                          onClick={(event) => addunit(event, node.children)}
                        ></RdsButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {hasChild && (
                <div>
                  <ul key={newData.key}>
                    <RdsComporganizationTreeNew
                      data={newData.children}
                      key={newData.key}
                      inputLabel={inputlabel}
                      CanvasTitle={canvasTitle}
                      AddUnitlabel={addUnitlabel}
                    ></RdsComporganizationTreeNew>
                  </ul>
                </div>
              )}
            </div>
          </li>{" "}
        </div>
      )}
    </>
  );
};

export default RdsComporganizationTreeNew;
