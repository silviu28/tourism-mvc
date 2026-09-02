import { useContext, useState, type FC } from "react";
import { type AdminPanelItem, type Feedback, type Image, type Notification, type Price, type ReceivedNotification } from "../../types";
import axios from "axios";
import Modal from "../Modal";
import AdminForm from "../AdminForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AlertContext from "../../AlertContext";

const selectedStyle = {
  background: 'lightblue'
};

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

const AdminPanel: FC = () => {
  const queryClient = useQueryClient();

  const showAlert = useContext(AlertContext);

  const [selectedItem, setSelectedItem] = useState<AdminPanelItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<"image" | "price" | "updatePrice">("image");
  const [notificationCategory, setNotificationCategory] = useState('Announcement')
  const [addingNewNotificationCategory, setAddingNewNotificationCategory] = useState(false)
  const [notificationCategoryName, setNotificationCategoryName] = useState('')
  const [notificationTime, setNotificationTime] = useState({
    time: 'A day',
    ms: 24 * 3600 * 1000
  })
  const [notification, setNotification] = useState<Notification>(() => NOTIFY_DEFAULT);
  const [pageNo, setPageNo] = useState(0);
  const [extension, setExtension] = useState({
    time: 'a day',
    ms: 24 * 3600 * 100
  })

  const openForm = (type: "image" | "price" | "updatePrice") => {
    setFormType(type);
    setIsModalVisible(true);
  };

  const { data: prices = [], isLoading: pricesLoading }
    = useQuery<Price[]>({
      queryKey: ["prices"],
      queryFn: async () => {
        try {
          const pricesRes = await axios.get("http://localhost:4004/api/prices");
          return pricesRes.data;
        } catch (_error) {
          showAlert("Unable to load prices", "", true);
        }
      }
    });
  const { data: gallery = [], isLoading: galleryLoading }
    = useQuery<Image[]>({
      queryKey: ["images"],
      queryFn: async () => {
        try {
          const imagesRes = await axios.get("http://localhost:4004/api/images");
          return imagesRes.data;
        } catch (_error) {
          showAlert("Unable to load images", "", true);
        }
      }
    });
  const { data: feedback = [], isLoading: feedbackLoading }
    = useQuery<Feedback[]>({
      queryKey: ["feedback"],
      queryFn: async () => {
        try {
          const feedbackRes = await axios.get("http://localhost:4004/api/feedback");
          return feedbackRes.data;
        } catch (_error) {
          showAlert("Unable to load feedback", "", true);
        }
      }
    });

  const { data: notificationCategories = [], isLoading: _categoriesLoading }
    = useQuery<{ id: number, name: string }[]>({
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
  })

  const remove = async (selectedItem: AdminPanelItem, path: string) => {
    if (!selectedItem) return;
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:4004/api/${path}/${selectedItem.id}`);
        queryClient.invalidateQueries({
          queryKey: [path]
        });
        showAlert("Item deleted", "", false);
      } catch (error) {
        showAlert("Unable to delete this item", "", true);
        console.error(error);
      }
    }
  };

  const submitImage = async (src: string) => {
    try {
      await axios.post("http://localhost:4004/api/images", { src });
      showAlert("Image uploaded", "", false);
      queryClient.invalidateQueries({
        queryKey: ["images"]
      });
    } catch (_error) {
      showAlert("Unable to upload image", "", true);
    }
  };

  const submitPrice = async (price: Price) => {
    try {
      await axios.post("http://localhost:4004/api/prices", price);
      showAlert("Price uploaded", "", false);
      queryClient.invalidateQueries({
        queryKey: ["prices"]
      });
    } catch (_error) {
      showAlert("Unable to add pricing", "", true);
    }
  }

  const updatePrice = async (price: Price) => {
    try {
      await axios.put(`http://localhost:4004/api/prices/${price.id}`, { price });
      showAlert("Price updated", "", false);
      queryClient.invalidateQueries({
        queryKey: ["prices"]
      });
    } catch (_error) {
      showAlert("Unable to update price", "", true);
    }
  }

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
  }

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
    <div className="slight-margin">
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

      <Modal
        isVisible={isModalVisible}
        visibilitySetter={setIsModalVisible}>
        <AdminForm
          which={formType}
          item={selectedItem!}
          onSubmitImage={submitImage}
          onSubmitPrice={submitPrice}
          onUpdatePrice={updatePrice}
        />
      </Modal>

      <h1>Edit price page</h1>
      <div className="container">
        {!pricesLoading && <ul>
          {prices.map(price =>
            <li
              key={price.id}
              style={price === selectedItem ? selectedStyle : {}}
              onClick={() => setSelectedItem(price)}>
              {price.country},{price.travelHost},{price.isAvailable ? "available" : "unavailable"},{price.travelHost},{price.priceLower || ""},{price.priceUpper || ""}
            </li>
          )}
        </ul>}
        <button onClick={() => openForm("price")}>+</button>
        <button onClick={() => remove(selectedItem!, "prices")}>Delete</button>
        <button onClick={() => openForm("updatePrice")}>Update</button>
      </div>

      <h1>Edit images shown in gallery</h1>
      <div className="container">
        {!galleryLoading && <ul>
          {gallery.map(img =>
            <li
              key={img.id}
              style={img === selectedItem ? selectedStyle : {}}
              onClick={() => setSelectedItem(img)}>{img.src}</li>)}
        </ul>}
        <button onClick={() => openForm("image")}>+</button>
        <button onClick={() => remove(selectedItem!, "images")}>Delete</button>
      </div>

      <h1>View feedbacks sent by users</h1>
      <div className="container">
        {!feedbackLoading && <ul>
          {feedback.map(fb =>
            <li
              key={fb.id}
              style={fb === selectedItem ? selectedStyle : {}}
              onClick={() => setSelectedItem(fb)}>{fb.feedback}</li>)}
        </ul>}
        <button onClick={() => remove(selectedItem!, "feedback")}>Delete</button>
      </div>

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
        {oldNotifsPage?.notifications.map((noti) => 
          <p
            key={noti.id}
            onClick={() => setSelectedItem(noti)}
            style={selectedItem === noti ? selectedStyle : {}}
          >
            {Object.entries(noti).map(([k, v]) => `${k}: ${v} `)}
          </p>
        )}
        <button
          onClick={() => {
            const z = selectedItem as ReceivedNotification;
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
          onClick={() => updateNotification({ ...selectedItem as ReceivedNotification, duration: 0 })}
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

    </div>
  );
};

export default AdminPanel;