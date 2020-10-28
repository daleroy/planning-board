import React from 'react';
import { CSVReader } from 'react-papaparse';

let callbackFunction;

const handleOnDrop = (data) => {
  console.log('---------------------------');
  callbackFunction(data);
  console.log(data);
  console.log('---------------------------');
}

const handleOnError = (err, file, inputElem, reason) => {
  console.log(err)
}

const handleOnRemoveFile = (data) => {
  console.log('---------------------------');
  console.log(data);
  console.log('---------------------------');
}

export default function DataImporter({callback}) {
    callbackFunction = callback ;

    return (
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        noDrag
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Click to upload.</span>
      </CSVReader>
    )
  }