import { useContext, type FC } from "react";
import { Link } from "react-router";
import UserContext from "../../UserContext";
import axios from "axios";
import AlertContext from "../../AlertContext";

import styled from "styled-components";
import { useState, useRef, useEffect, type FunctionComponent } from "react";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: -2rem 2rem;
  top: -100%;
  left: 100%;
  background-color: orange;
  z-index: 10;
  li {
    list-style: none;
  }
`;

const NavFlex = styled.ul`
  display: flex;
  gap: .5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 20;
`;

const NotificationButton = styled.button`
  position: relative;
  top: 15%;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 2px;
  left: 20px;
  background-color: #ef4444;
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`;

const Panel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 340px;
  max-height: 420px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: translateY(${({ $open }) => ($open ? "0" : "-8px")});
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;

  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: #111827;
  }
`;

const NotificationList = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const NotificationItem = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

const UnreadDot = styled.span`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background-color: #2563eb;
`;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NotificationTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #111827;
`;

const NotificationMessage = styled.span`
  font-size: 0.8rem;
  color: #4b5563;
`;

const NotificationTime = styled.span`
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 2px;
`;

const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  font-size: 0.85rem;
  color: #9ca3af;
`;

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationNotificationProps {
  notifications: Notification[];
}

const NotificationNotification: FunctionComponent<NotificationNotificationProps> = ({ notifications }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <NotificationButton onClick={() => setOpen(!open)} aria-label="Notifications">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
        </svg>
        {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
      </NotificationButton>

      <Panel $open={open}>
        <PanelHeader>
          <h4>Notifications</h4>
          <button>Mark all as read</button>
        </PanelHeader>

        <NotificationList>
          {notifications.length === 0 
          ? <EmptyState>You're all caught up.</EmptyState>
          : notifications.map((n) =>
              <NotificationItem key={n.id}>
                {n.unread && <UnreadDot />}
                <NotificationContent>
                  <NotificationTitle>{n.title}</NotificationTitle>
                  <NotificationMessage>{n.message}</NotificationMessage>
                  <NotificationTime>{n.time}</NotificationTime>
                </NotificationContent>
              </NotificationItem>
            )
          }
        </NotificationList>

        <button>View all notifications</button>
      </Panel>
    </Wrapper>
  );
};

interface NavbarProps {
  isAdmin: boolean;
};

const Navbar: FC<NavbarProps> = ({ isAdmin }) => {
  const [user, setUser] = useContext(UserContext);
  const showAlert = useContext(AlertContext);

  const promptLogout = async () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem('user');
      try {
        await axios.post("http://localhost:4004/api/logout");
        showAlert("Succesfully logged out", "", false);
        setUser!({});
      } catch (_error) {
        showAlert("Cannot logout", "", true);
      }
    }
  };

  return (
    <Bar>
      <img style={{ width: '50px', height: '50px' }} src="favi.png"/>
      <NavFlex>
        <li><Link to="/">Home</Link></li>
        {!user!.username &&
          <>
            <li>
              <Link to="/signup">
              Sign Up
              </Link>
              </li>
            <li><Link to="/login">Login</Link></li>
          </>
        }
        <li><Link to="/wiki">Wiki</Link></li>
        <li><Link to="/prices">Prices</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        {user!.username && isAdmin &&
          <li><Link to="/admin">Admin</Link></li>}
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </NavFlex>
      <NotificationNotification notifications={[]} />

      <ul>
        {user!.username && (
          <li>
            <a onClick={promptLogout}>Welcome, <i>{user!.username}</i>!</a>
          </li>
        )}
      </ul>
    </Bar>
  );
};

export default Navbar;