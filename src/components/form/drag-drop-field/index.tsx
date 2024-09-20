import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5"; // You can use any icon for the close button

interface DragDropFieldProps {
  onDrop: (acceptedFiles: File[]) => void;
  file?: File | null; // To display the selected file name
  clearFile: () => void; // To clear the selected file
}

const DragDropField: React.FC<DragDropFieldProps> = ({
  onDrop,
  file,
  clearFile,
}) => {
  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropAccepted,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"], // Accept only image types
    },
  });

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-md text-center">
      {!file ? (
        <div
          {...getRootProps()}
          className={`cursor-pointer ${isDragActive ? "border-blue-500" : ""}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>Drag 'n' drop a logo here, or click to select one</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 border rounded-md bg-gray-100">
          <div>{file.name}</div>
          <button onClick={clearFile} className="text-red-500">
            <IoClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DragDropField;
