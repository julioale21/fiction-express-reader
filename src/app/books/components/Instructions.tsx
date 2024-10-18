import { AnimatePresence } from "framer-motion";
import { BookListInstructions } from "./";
import { instructions } from "@/constants";

interface InstructionsProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const Instructions: React.FC<InstructionsProps> = ({ show, setShow }) => {
  if (!show) return null;

  return (
    <AnimatePresence>
      <BookListInstructions
        title="¡Comienza tu aventura!"
        steps={instructions}
        setShowInstructions={setShow}
      />
    </AnimatePresence>
  );
};

export { Instructions };
