import React from 'react';
import XLSX from 'xlsx';

const MyComponent = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonData);
      // Aquí puedes explorar y trabajar con los datos del archivo de Excel
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>My Component</h1>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};

export default MyComponent;