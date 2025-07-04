import { cn } from "lib/util";
import { useEffect, useState } from "react";

export default function EditReservationPopup({
  visible,
  setVisible,
}: {
  visible: { visible: boolean; selectedID: string | null; data: Reservation[] };
  setVisible: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      selectedID: string | null;
      data: Reservation[];
    }>
  >;
}) {
  let mydata: Reservation | null =
    visible.data.find((e) => e.id === visible.selectedID) || null;

  function closePopup() {
    setVisible((previous) => ({
      visible: false,
      data: previous.data,
      selectedID: null,
    }));
  }

  const [formData, setFormData] = useState<Reservation | null>(null);

  useEffect(() => {
    mydata = visible.data.find((e) => e.id === visible.selectedID) || null;
    setFormData(mydata);
  }, [visible]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    setVisible((pre)=>({
        ...pre,
        data: pre.data.map((item) =>
      item.id === formData.id ? formData : item // replace the matching one
    ),
    }))
    // Example: Update logic here or call backend API
    // After update:
    closePopup();
  }

  return (
    <div
      id="crud-modal"
      
      className={cn(
        "overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 z-[1000000] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full",
        { hidden: visible.visible == false, block: visible.visible == true }
      )}
    >
      <div onClick={closePopup} className="fixed bg-black/40 top-0 left-0 right-0 bottom-0 "></div>
      <div className="fixed right-1/2 translate-1/2 p-4 w-full max-w-md max-h-full ">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-xl ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 ">
              Modifier Resevation
            </h3>
            <button
              onClick={closePopup}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
            {formData && (
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                {/* Full Name */}
                <div className="col-span-2">
                  <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Email */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Date */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">
                    Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Time */}
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">
                    Heure
                  </label>
                  <input
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">
                    Statut
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="Confirmée">Confirmée</option>
                    <option value="En attente">En attente</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-primary-100 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Sauvegarder la réservation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
