import { IoMdClose } from "react-icons/io";
import Field from "./Field";
import api from "../api";
const Modal = ({
  isModelOpen,
  setIsModelOpen,
  setContacts,
  editItem,
  setEditItem,
}) => {
  // form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData.entries());
    if (!editItem) {
      //  erişilen değerleri apiye gönder
      const response = await api.post("/contact", newContact);
      // contacts stateini güncelle önceki verileri koru ve üzerine yeni eklenen kişiyi ekle
      setContacts((contacts) => [...contacts, response.data]);
    } else {
      // güncellenecek kişiyi apiye gönder
      const response = await api.put(`/contact/${editItem.id}`, newContact);
      // güncellenen kişiyi contact statei içerisinde güncelle
      setContacts((contacts) =>
        contacts.map((contact) =>
          contact.id === editItem.id ? response.data : contact
        )
      );
      // edititem stateni nulla çek
      setEditItem(null);
    }

    // modal penceresini kapat
    setIsModelOpen(false);
  };
  return (
    isModelOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"} </h2>
            <button
              onClick={() => {
                setEditItem(null);
                setIsModelOpen(false);
              }}
            >
              <IoMdClose />
            </button>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim Soyisim" name="name" />
            <Field value={editItem?.position} label="Pozisyon" name="position" />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon" name="phone" />
            <Field value={editItem?.email} label="Email" name="email" />
            <div className="buttons">
              <button
                onClick={() => {
                  setEditItem(null);
                  setIsModelOpen(false);
                }}
              >
                Vazgeç
              </button>
              <button type="submit">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default Modal;
