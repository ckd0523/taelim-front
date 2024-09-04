import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsPlus } from "react-icons/bs";
import { Accordion, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom")
  );
  return (
    <button
      className="custom-button"
      type="button"
      style={{ backgroundColor: "white" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
const FileUpload = ({ files = [], setFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);

      acceptedFiles.forEach((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // 메모리 누수를 방지하기 위해 파일 URL을 정리
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    // <section className="container">
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <CustomToggle eventKey="0">이미지 등록</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <BsPlus style={{ fontSize: "50px" }} />
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
    // </section>
  );
};

export default FileUpload;
