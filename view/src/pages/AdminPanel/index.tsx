import { useState, type FC } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import styled from "styled-components";
import useVerticalCheck from "../../utils/useVerticalCheck";

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  min-width: 15%;
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
  { "to": "/admin/wiki", "name": "Wiki Posts" },
];

const AdminPanel: FC = () => {
  const location = useLocation().pathname;
  const [route, setRoute] = useState(location);
  const isVertical = useVerticalCheck();

  if (isVertical) {
    return (
      <div style={{ margin: 60 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" viewBox="0 0 16 16">
          <path d="M1 4.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm-1 6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2z"/>
          <path d="M14 7.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/>
        </svg>
        <h1>Please turn your device to landscape or extend the width of your browser window to continue.</h1>
      </div>
    );
  }

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