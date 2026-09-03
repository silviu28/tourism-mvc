import { useState, type FC } from "react";
import Modal from "../Modal";
import { NavLink, Outlet } from "react-router";

const AdminPanel: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>

      <div style={{ marginRight: 20, marginTop: 20, display: "flex", flexDirection: "column" }}>
        <NavLink to="/admin/blog">Prices</NavLink>
        <NavLink to="/admin/gallery">Gallery</NavLink>
        <NavLink to="/admin/feedback">Feedback</NavLink>
        <NavLink to="/admin/notifications">Notifications</NavLink>
        <NavLink to="/admin/blog">Blog Posts</NavLink>
      </div>

      <div className="slight-margin;width:100%;">
        <Outlet />
        
        <Modal
          isVisible={isModalVisible}
          visibilitySetter={setIsModalVisible}>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanel;