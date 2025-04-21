import { LabCanvas } from "./lab-canvas";
import { LabForm } from "./lab-form";
import { LabTools } from "./lab-tools";

export const LabSection = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-center my-10"
      id="lab"
    >
      <div className="sm:w-2/3 h-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 border w-full h-full rounded-xl">
          <div className="col-span-3 w-full">
            <div className="grid grid-cols-3 gap-4">
              <LabCanvas />
              <LabTools />
            </div>
          </div>
          <div className="col-span-3 border-t w-full my-2">
            <LabForm />
          </div>
        </div>
      </div>
    </div>
  );
};
