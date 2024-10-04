"use client";
import { getPaginatedTenantEntities } from "@/api/tenant-entity.service";
import { deleteTenantUser, getPaginatedTenants } from "@/api/tenant.service";
import TextFilterDropdown from "@/components/table/filters/text.filter";
import { SearchOutlined } from "@ant-design/icons";
import { Table, TableProps, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

interface TenantEntityDataType {
  key?: string;
  _id: string;
  name: string;
  createdAt: string | null;
  subdomain: string;
  customDomain: string;
  isPublished: boolean;
  isDomainVerified: boolean;
  libraryName: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  logo?: string;
}

const TenantEntitiesListPage: React.FC = () => {
  const [data, setData] = useState<TenantEntityDataType[]>([]);
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
      const response = await getPaginatedTenantEntities(
        pagination.current,
        pagination.pageSize,
        updatedFilters
      );
      setData(
        response.items.map((tenantEntity: any) => ({
          ...tenantEntity,
          key: tenantEntity._id,
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

  const columns: TableProps<TenantEntityDataType>["columns"] = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={logo || "/default-logo.png"}
          alt="Tenant Logo"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
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
      title: "Library Name",
      dataIndex: "libraryName",
      key: "libraryName",
    },
    {
      title: "Subdomain",
      dataIndex: "subdomain",
      key: "subdomain",
      render: (subdomain, record) => (
        <span>{subdomain || record.customDomain || "Not Set"}</span> // Display subdomain or custom domain
      ),
    },
    {
      title: "Email",
      dataIndex: ["contact", "email"],
      key: "contact.email",
      filterDropdown: () => (
        <TextFilterDropdown
          dataIndex="contact.email"
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
      dataIndex: ["contact", "phone"],
      key: "contact.phone",
      filterDropdown: () => (
        <TextFilterDropdown
          dataIndex="contact.phone"
          setFilters={setFilters}
          fetchData={fetchData}
        />
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) =>
        `${address.street}, ${address.city}, ${address.state}, ${address.country}`,
    },
    {
      title: "Date of Registration",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (createdAt ? createdAt : "N/A"), // Handle null case
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <span
    //       title={`Delete ${record.name}`}
    //       onClick={() => handleDelete(record._id)} // Assuming _id is the unique identifier
    //       style={{ cursor: "pointer", color: "red" }}
    //     >
    //       <FiTrash />
    //     </span>
    //   ),
    // },
  ];

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Tenants</h2>
      <Table<TenantEntityDataType>
        columns={columns}
        dataSource={data}
        rowKey={"key"}
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

export default TenantEntitiesListPage;
