import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axiosInstance from "lib/axios";
import { FormStep1, FormStep2, FormStep3 } from "~/components/reserForm";
import { Stepper } from "~/components";

const Reserve = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [room, setRoom] = useState<Room | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roomID = searchParams.get("roomID");

  useEffect(() => {
    if (!roomID) {
      navigate("/user/chambre");
      return;
    }

    async function fetchRoom() {
      try {
        const res = await axiosInstance.get(`/api/rooms/${roomID}`);
        const data = res.data;

        if (data.status !== "AVAILABLE") {
          navigate("/user/chambre");
        } else {
          setRoom(data);
        }
      } catch (error) {
        navigate("/user/chambre");
      }
    }

    fetchRoom();
  }, [roomID, navigate]);

  const goNext = () => setCurrentStep((prev) => prev + 1);

  const steps = [
    { label: "Information", component: <FormStep1 onNext={goNext} /> },
    { label: "Paiement", component: <FormStep2 onNext={goNext} /> },
    { label: "Confirmation", component: <FormStep3 /> },
  ];

  if (!room) return <p>Chargement de la chambre...</p>;

  return (
    <main className="wrapper">
      <Stepper currentStep={currentStep} />
      <div className="mt-10">{steps[currentStep].component}</div>
    </main>
  );
};

export default Reserve;
