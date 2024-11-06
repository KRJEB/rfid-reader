import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [metadata, setMetadata] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Initialize Web NFC when the app loads
    const initializeNFC = async () => {
      if ("NDEFReader" in window) {
        try {
          const ndef = new window.NDEFReader();

          // Start scanning for NFC tags
          await ndef.scan();
          console.log("NFC scanning started...");

          ndef.onreading = (event) => {
            console.log("NFC tag detected!");
            const tagMetadata = [];

            // Process each record in the tag message
            for (const record of event.message.records) {
              const recordData = {};

              // Extract record type
              recordData.type = record.recordType;

              // Extract record ID
              if (record.id) {
                recordData.id = record.id;
              }

              // Convert payload data to a hexadecimal string
              const hexPayload = Array.from(new Uint8Array(record.data))
                .map((byte) => byte.toString(16).padStart(2, "0"))
                .join(" ");
              recordData.payload = hexPayload;

              tagMetadata.push(recordData);
            }

            setMetadata(tagMetadata);
          };

          ndef.onreadingerror = () => {
            setError("Error reading NFC tag.");
          };
        } catch (err) {
          setError(`Error initializing NFC: ${err.message}`);
        }
      } else {
        setError("Web NFC is not supported in this browser.");
      }
    };

    initializeNFC();
  }, []);

  return (
    <div className="app">
      <h1>RFID Reader</h1>
      <div className="nfc-output">
        {error && <p className="error">{error}</p>}
        {metadata.length > 0 ? (
          metadata.map((record, index) => (
            <div key={index} className="record">
              <p><strong>Type:</strong> {record.type}</p>
              {record.id && <p><strong>ID:</strong> {record.id}</p>}
              <p><strong>Payload:</strong> {record.payload}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No RFID tag detected. Bring a tag close to scan.</p>
        )}
      </div>
    </div>
  );
};

export default App;
