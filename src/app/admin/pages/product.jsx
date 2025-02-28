"use client";
import { Table, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "@/redux/features/productSlice";
import { useState } from "react";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button onClick={() => setVisible(true)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={products} columns={columns} />
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        <p>Edit Product Form</p>
      </Modal>
    </div>
  );
};

export default Products;
