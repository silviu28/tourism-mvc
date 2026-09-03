import { useState, type FC } from "react";
import { NavLink, Outlet } from "react-router";
import styled from "styled-components";

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 10%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #eb9900;
`;

const Content = styled.div`
  width: 80%;
  padding: 20px;
  margin: 20px;
`;

const AdminLink = styled(NavLink)`
  color: black;
`;

const links = [
  { "to": "/admin/analytics", "name": "Analytics" },
  { "to": "/admin/prices", "name": "Prices" },
  { "to": "/admin/gallery", "name": "Gallery" },
  { "to": "/admin/feedback", "name": "Feedback" },
  { "to": "/admin/notifications", "name": "Notifications" },
  { "to": "/admin/blog", "name": "Blog Posts" },
];

const AdminPanel: FC = () => {
  const [route, setRoute] = useState("/admin");

  return (
    <PanelWrapper>
      <Sidebar>
        <p><b>MyTravel</b></p>
        {links.map(({ to, name }) =>
          <AdminLink
            to={to}
            onClick={() => setRoute(to)}
          >
            {route === to && '> '}{name}
          </AdminLink>
        )}
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </PanelWrapper>
  );
};

export default AdminPanel;