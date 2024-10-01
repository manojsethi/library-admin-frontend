"use client";
import { deleteTenantUser, getPaginatedTenants } from "@/api/tenant.service";
import TextFilterDropdown from "@/components/table/filters/text.filter";
import { SearchOutlined } from "@ant-design/icons";
import { Table, TableProps, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

interface TenantDataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  roles: string[];
}
const TenantListPage: React.FC = () => {
  const [data, setData] = useState<TenantDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const fetchData = async (updatedFilters = filters) => {
    setLoading(true);
    try {
      const response = await getPaginatedTenants(
        pagination.current,
        pagination.pageSize,
        updatedFilters
      );
      setData(
        response.items.map((tenant: any) => ({
          ...tenant,
          key: tenant._id,
        }))
      );
      setPagination({
        current: response.meta.currentPage,
        pageSize: response.meta.itemsPerPage,
        total: response.meta.totalItems,
      });
    } catch (error) {
      console.error("Failed to fetch tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData initially
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
    });
  };

  const handleDelete = async (key: string) => {
    console.log("Deleting record with key:", key);
    await deleteTenantUser(key);
    fetchData();
  };

  const columns: TableProps<TenantDataType>["columns"] = [
    {
      title: "Date of Registration",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      filterDropdown: () => (
        <TextFilterDropdown
          dataIndex="name"
          setFilters={setFilters}
          fetchData={fetchData}
        />
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Roles",
      key: "roles",
      dataIndex: "roles",
      render: (_, { roles }: TenantDataType) => {
        return (
          <>
            {roles.map((role) => {
              let color = "green";
              return (
                <Tag color={color} key={role}>
                  {role.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterDropdown: () => (
        <TextFilterDropdown
          dataIndex="email"
          setFilters={setFilters}
          fetchData={fetchData}
        />
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      filterDropdown: () => (
        <TextFilterDropdown
          dataIndex="phone"
          setFilters={setFilters}
          fetchData={fetchData}
        />
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span
          title={`Delete ${record.name}`}
          onClick={() => handleDelete(record.key)} // Replace this with your delete function
          style={{ cursor: "pointer", color: "red" }}
        >
          <FiTrash />
        </span>
      ),
    },
  ];

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Tenants</h2>
      <Table<TenantDataType>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange} // Handle page change
      />
    </>
  );
};

export default TenantListPage;
