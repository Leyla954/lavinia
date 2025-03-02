import React, { useState } from "react";
import { Input, Button, Table, Space, Modal, List } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const initialTailors = [
  { id: 1, name: "Kamran Mammadov", rating: 4.5, reviews: ["Great work!", "Highly recommended!"] },
  { id: 2, name: "Elvin Huseynov", rating: 4.8, reviews: ["Very professional", "Excellent quality"] },
];

const ReviewsPage = () => {
  const [tailors, setTailors] = useState(initialTailors);
  const [newTailor, setNewTailor] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [newReview, setNewReview] = useState("");

  const addTailor = () => {
    if (newTailor.trim()) {
      const newEntry = {
        id: Date.now(),
        name: newTailor,
        rating: 5.0,
        reviews: [],
      };
      setTailors([...tailors, newEntry]);
      setNewTailor("");
      setIsModalVisible(false);
    }
  };

  const deleteTailor = (id) => {
    setTailors(tailors.filter((tailor) => tailor.id !== id));
  };

  const addReview = () => {
    if (newReview.trim() && selectedTailor) {
      setTailors(
        tailors.map((tailor) =>
          tailor.id === selectedTailor.id
            ? { ...tailor, reviews: [...tailor.reviews, newReview] }
            : tailor
        )
      );
      setNewReview("");
    }
  };

  const deleteReview = (tailorId, reviewIndex) => {
    setTailors(
      tailors.map((tailor) =>
        tailor.id === tailorId
          ? { ...tailor, reviews: tailor.reviews.filter((_, idx) => idx !== reviewIndex) }
          : tailor
      )
    );
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    {
      title: "Reviews",
      key: "reviews",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedTailor(record)}>
          Manage Reviews ({record.reviews.length})
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined style={{ color: "red" }} />}
          onClick={() => deleteTailor(record.id)}
        />
      ),
    },
  ];

  return (
    <div 
      className="p-5 bg-cover bg-center size-full bg-[url('https://www.blogtyrant.com/wp-content/uploads/2013/01/how-to-get-more-blog-comments.jpg')]">
      <h2 className="text-xl font-semibold mb-4">Tailors & Reviews</h2>
      <Button className="shadow-lg shadow-green-500/80 bg-green-100" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
        Add New Tailor
      </Button>
      <Table columns={columns} dataSource={tailors} rowKey="id" className="mt-4 shadow-lg shadow-green-500/100 bg-white rounded-lg" />
   <Modal
        title="Add New Tailor"
        open={isModalVisible}
        onOk={addTailor}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter tailor's name"
          value={newTailor}
          onChange={(e) => setNewTailor(e.target.value)}
        />
      </Modal>

      {selectedTailor && (
        <Modal
          title={`Manage Reviews for ${selectedTailor.name}`}
          open={true}
          onCancel={() => setSelectedTailor(null)}
          footer={null}
        >
          <List
            bordered
            dataSource={selectedTailor.reviews}
            renderItem={(review, index) => (
              <List.Item
                actions={[<DeleteOutlined style={{ color: "red" }} onClick={() => deleteReview(selectedTailor.id, index)} />]}
              >
                {review}
              </List.Item>
            )}
          />
          <Space className="mt-4">
            <Input
              placeholder="Add a review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <Button type="primary" onClick={addReview}>
              Submit
            </Button>
          </Space>
        </Modal>
      )}
    </div>
  );
};

export default ReviewsPage;
