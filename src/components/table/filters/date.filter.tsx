import { Button, DatePicker } from "antd";
import React, { useState } from "react";

interface SingleDateFilterDropdownProps {
  dataIndex: string;
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>; // Function to update filters
  fetchData: (updatedFilters: { [key: string]: string }) => void; // Function to fetch filtered data
}

const DateFilterDropdown: React.FC<SingleDateFilterDropdownProps> = ({
  dataIndex,
  setFilters,
  fetchData,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (date: any, dateString: any) => {
    setSelectedDate(dateString);
  };

  const handleSearch = () => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [dataIndex]: selectedDate,
      };
      fetchData(updatedFilters); // Call fetchData with the latest filters
      return updatedFilters;
    });
  };

  const handleReset = () => {
    setSelectedDate("");
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[dataIndex];
      fetchData(updatedFilters); // Call fetchData with the updated filters after reset
      return updatedFilters;
    });
  };

  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        onChange={handleDateChange}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        onClick={handleSearch}
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

export default DateFilterDropdown;
