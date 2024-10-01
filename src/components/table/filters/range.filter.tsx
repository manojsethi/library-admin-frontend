import { Button, DatePicker } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface DateRangeFilterDropdownProps {
  dataIndex: string;
  setFilters: React.Dispatch<
    React.SetStateAction<{ [key: string]: [string, string] }>
  >; // Function to update filters
  fetchData: (updatedFilters: { [key: string]: [string, string] }) => void; // Function to fetch filtered data
}

const DateRangeFilterDropdown: React.FC<DateRangeFilterDropdownProps> = ({
  dataIndex,
  setFilters,
  fetchData,
}) => {
  const [selectedRange, setSelectedRange] = useState<[string, string]>([
    "",
    "",
  ]);

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedRange(dateStrings);
  };

  const disabledEndDate = (endValue: dayjs.Dayjs) => {
    const startValue = selectedRange[0]
      ? dayjs(selectedRange[0], "YYYY-MM-DD")
      : null;

    if (!endValue || !startValue) {
      return false; // Allow all dates if there's no "From" date selected
    }
    return endValue.isBefore(startValue, "day"); // Disable "To" date if it's before the "From" date
  };

  const handleSearch = () => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [dataIndex]: selectedRange,
      };
      fetchData(updatedFilters); // Call fetchData with the latest filters
      return updatedFilters;
    });
  };

  const handleReset = () => {
    setSelectedRange(["", ""]);
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[dataIndex];
      fetchData(updatedFilters); // Call fetchData with the updated filters after reset
      return updatedFilters;
    });
  };

  return (
    <div style={{ padding: 8 }}>
      <div>
        <RangePicker
          value={[
            selectedRange[0] ? dayjs(selectedRange[0], "YYYY-MM-DD") : null,
            selectedRange[1] ? dayjs(selectedRange[1], "YYYY-MM-DD") : null,
          ]}
          onChange={handleRangeChange}
          style={{ marginBottom: 8 }}
        />
      </div>
      <div className="flex justify-end">
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
    </div>
  );
};

export default DateRangeFilterDropdown;
