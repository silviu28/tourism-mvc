import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Notification, ReceivedNotification } from "../../types";
import { useContext, useState } from "react";
import Modal from "../Modal";
import AlertContext from "../../AlertContext";
import DynamicTable from "../DynamicTable";

const NOTIFY_DEFAULT: Notification = {
  category: "",
  duration: 24 * 3600,
  title: "",
  content: ""
} as const;

interface NotificationsPagedQuery {
  notifications: ReceivedNotification[],
  totalCount: number,
  totalPages: number,
  currentPage: number
}

const ManageNotifications = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Notification | null>(null);
  const [notificationCategory, setNotificationCategory] = useState('Announcement');
  const [addingNewNotificationCategory, setAddingNewNotificationCategory] = useState(false);
  const [notificationCategoryName, setNotificationCategoryName] = useState('');
  const [notificationTime, setNotificationTime] = useState({
    time: 'A day',
    ms: 24 * 3600 * 1000
  });
  const [notification, setNotification] = useState<Notification>(() => NOTIFY_DEFAULT);
  const [pageNo, setPageNo] = useState(0);
  const [extension, setExtension] = useState({
    time: 'a day',
    ms: 24 * 3600 * 100
  });
  const showAlert = useContext(AlertContext);
  
  const { data: notificationCategories = [], isLoading: _categoriesLoading } = useQuery<{ id: number, name: string }[]>({
    queryKey: ["notification-categories"],
    queryFn: async () => {
      try {
        const notifRes = await axios.get("http://localhost:4004/api/notificationCategory");
        return notifRes.data;
      } catch (_error) {
        showAlert("Unable to retrieve notification categories", "", true);
      }
    }
  });

  const { data: oldNotifsPage, isLoading: oldNotifsLoading }
    = useQuery<NotificationsPagedQuery>({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const notifRes = await axios.get(`http://localhost:4004/api/notifications?page=${pageNo}`)
        return notifRes.data;
      } catch (_error) {
        showAlert("Unable to retrieve old notifications", "", true);
        return [];
      }
    }
  });

  const addCategory = async () => {
    try {
      await axios.post('http://localhost:4004/api/notificationCategory', { name: notificationCategoryName });
      showAlert("Category added", "", false);
      queryClient.invalidateQueries({
        queryKey: ["notification-categories"]
      });
    } catch (_error) {
      showAlert("Unable to add category", "", true);
    }
  };

  const sendNotification = async (noti: Notification) => {
    try {
      await axios.post('http://localhost:4004/api/notifications', noti);
      showAlert("Notification sent", "", false);
      queryClient.invalidateQueries({
        queryKey: ["notifications-all"]
      });
    } catch (_error) {
      showAlert("Unable to send notification", "", true);
    }
  };

  const updateNotification = async (noti: ReceivedNotification) => {
    try {
      await axios.put(`http://localhost:4004/api/notifications/${noti.id}`, noti);
      showAlert("Notification updated", "", false);
      queryClient.invalidateQueries({
        queryKey: ["notifications-all"]
      });
    } catch (_error) {
      showAlert("Unable to update notification", "", true);
    }
  };
  
  return (
    <>
      <Modal
        isVisible={addingNewNotificationCategory}
        visibilitySetter={setAddingNewNotificationCategory}
      >
        <label>Category:</label>
        <input
          type="text"
          value={notificationCategoryName}
          onChange={(e) => setNotificationCategoryName(e.target.value)}
        />
        <button
          disabled={!notificationCategoryName}
          onClick={() => addCategory()}
        >
          Add
        </button>
      </Modal>
      <h1>Alert users via notification</h1>
      <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
        
        <label>Category:</label>
        <select value={notificationCategory} onChange={(e) => setNotificationCategory(e.target.value)}>
          {notificationCategories.length
            ? notificationCategories.map((nc) => 
              <option key={nc.id} value={nc.name}>{nc.name}</option>
            )
            : <option>An error occured.</option>
          }
          <option onClick={() => setAddingNewNotificationCategory(true)}>Add new...</option>
        </select>

        <p>Duration:</p>
        <select value={notificationTime.time}>
          <option onClick={() => setNotificationTime({ time: 'One day', ms: 24 * 3600 * 1000 })}>One day</option>
          <option onClick={() => setNotificationTime({ time: 'One week', ms: 24 * 3600 * 1000 * 7 })}>One week</option>
          <option onClick={() => setNotificationTime({ time: 'One month', ms: 24 * 3600 * 1000 * 31 })}>One month</option>
          <option onClick={() => setNotificationTime({ time: 'One year', ms: 24 * 3600 * 1000 * 365 })}>One year</option>
        </select>

        <label>Title:</label>
        <input
          type="text"
          value={notification.title}
          onChange={(e) => setNotification({ ...notification, title: e.target.value })}
        />

        <label>Content:</label>
        <input
          type="text"
          style={{ width: '90%' }}
          value={notification.content}
          onChange={(e) => setNotification({ ...notification, content: e.target.value })}/>
        <button
          disabled={!!0}
          onClick={() => sendNotification({ ...notification, duration: notificationTime.ms })}
        >
          Send
        </button>
      </div>

      <h1>Manage broadcasted notifications</h1>
      <div className="container">
        {oldNotifsLoading && <p>Please wait...</p>}
        {oldNotifsPage && (
          <DynamicTable
            items={oldNotifsPage.notifications}
            onRowSelect={(item) => setSelected(item as Notification)}
          />
        )}
        <button
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          onClick={() => {
            const z = selected as ReceivedNotification;
            updateNotification({ ...z, duration: z.duration + extension.ms })
          }}
        >
          Extend duration with
          <select
            onClick={(e) => e.stopPropagation()}
          >
            <option onClick={() => setExtension({ ...extension, ms: 24 * 3600 })}>a day</option>
            <option onClick={() => setExtension({ ... extension, ms: 24 * 3600 * 7 })}>a week</option>
            <option onClick={() => setExtension({ ...extension, ms: 3600 * 24 * 30 })}>a month</option>
            <option onClick={() => setExtension({ ...extension, ms: 3600 * 24 * 365 })}>a year</option>
          </select>
        </button>
        <button
          onClick={() => updateNotification({ ...selected as ReceivedNotification, duration: 0 })}
        >
          Cancel
        </button>
        {oldNotifsPage && (
          <>
            <button onClick={() => setPageNo((pageNo + 1) % oldNotifsPage.totalPages)}>{'<'}</button>
            <p>Page {oldNotifsPage.currentPage} of {oldNotifsPage.totalPages}</p>
            <button onClick={() => setPageNo(pageNo > 0 ? pageNo - 1 : 0)}>{'>'}</button>
          </>
        )}
      </div>
    </>
  );
};

export default ManageNotifications;