import { Button, Input } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

interface TextFilterDropdownProps {
  dataIndex: string; // The key used to filter, e.g., "email"
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // Function to update filters
  fetchData: (updatedFilters: { [key: string]: string }) => void; // Function to fetch filtered data
}

const TextFilterDropdown: React.FC<TextFilterDropdownProps> = ({
  dataIndex,
  setFilters,
  fetchData,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = () => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [dataIndex]: searchText,
      };
      fetchData(updatedFilters); // Call fetchData with the latest filters
      return updatedFilters;
    });
  };

  const handleReset = () => {
    setSearchText("");
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[dataIndex];
      fetchData(updatedFilters); // Call fetchData with the updated filters after reset
      return updatedFilters;
    });
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={handleSearch}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        onClick={handleSearch}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90, marginRight: 10 }}
      >
        Search
      </Button>
      <Button onClick={handleReset} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  );
};

export default TextFilterDropdown;
