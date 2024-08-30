import React from "react";
import { Modal, Typography, Button } from "@mui/material";

const QRCodeDisplay = ({ qrCodeUrl, onClose }) => {
  return (
    <Modal
      open={Boolean(qrCodeUrl)}
      onClose={onClose}
      aria-labelledby="qr-code-modal-title"
      aria-describedby="qr-code-modal-description"
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography id="qr-code-modal-title" variant="h6">
          QR Code
        </Typography>
        {qrCodeUrl && (
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ width: "100%", maxWidth: "400px", margin: "20px 0" }}
          />
        )}
        <Button onClick={onClose} variant="contained" color="primary">
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default QRCodeDisplay;
