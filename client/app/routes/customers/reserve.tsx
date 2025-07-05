import { RootNavbar, Stepper } from "~/components";

import { useEffect, useLayoutEffect, useState } from "react";

import { FormStep1, FormStep2, FormStep3 } from "~/components/reserForm";
import { useSearchParams, Navigate } from "react-router";

export default function Reserve() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [searchParams] = useSearchParams();

  const roomNumber = searchParams.get("roomNumber");
  const roomID = searchParams.get("roomID");
 

  if (!roomID || !roomNumber) {
    return <Navigate to={"/chambre"} replace />;
  }
 
  const goNext = () => setCurrentStep((prev) => prev + 1);
  const steps = [
    { label: "Information", component: <FormStep1 onNext={goNext} /> },
    { label: "Paiement", component: <FormStep2 onNext={goNext} /> },
    { label: "Confirmation", component: <FormStep3 /> },
  ];
  return (
    <div>

      <main className="wrapper ">
        <div className="relative">
          <div className="absolute inset-0 z-99999"></div>
          <Stepper currentStep={currentStep} />
        </div>

        <div className="mt-10">{steps[currentStep].component}</div>
      </main>
    </div>
  );
}
