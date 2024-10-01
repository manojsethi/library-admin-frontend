import { Button, Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;

interface BooleanFilterDropdownProps {
  dataIndex: string;
  setFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean | null }>
  >; // Function to update filters
  fetchData: (updatedFilters: { [key: string]: boolean | null }) => void; // Function to fetch filtered data
  trueLabel?: string; // Custom labels for true/false
  falseLabel?: string;
}

const BooleanFilterDropdown: React.FC<BooleanFilterDropdownProps> = ({
  dataIndex,
  setFilters,
  fetchData,
  trueLabel = "True",
  falseLabel = "False",
}) => {
  const [selectedValue, setSelectedValue] = useState<boolean | null>(null);

  const handleSelectChange = (value: boolean) => {
    setSelectedValue(value);
  };
  const handleSearch = () => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [dataIndex]: selectedValue,
      };
      fetchData(updatedFilters); // Call fetchData with the latest filters
      return updatedFilters;
    });
  };

  const handleReset = () => {
    setSelectedValue(null);
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[dataIndex];
      fetchData(updatedFilters); // Call fetchData with the updated filters after reset
      return updatedFilters;
    });
  };

  return (
    <div style={{ padding: 8 }}>
      <Select
        value={selectedValue}
        onChange={handleSelectChange}
        style={{ marginBottom: 8, display: "block", width: "100%" }}
        placeholder="Select status"
      >
        <Option value={true}>{trueLabel}</Option>
        <Option value={false}>{falseLabel}</Option>
      </Select>
      <Button
        type="primary"
        onClick={handleSearch}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
      <Button
        onClick={handleReset}
        size="small"
        style={{ width: 90, marginTop: 8 }}
      >
        Reset
      </Button>
    </div>
  );
};

export default BooleanFilterDropdown;
