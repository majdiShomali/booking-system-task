import { ShieldClose } from "lucide-react";
import React from "react";
type Props = {
  error?: string;
};
const ValidationErrorBlock: React.FC<Props> = ({ error }) => {
  return (
    <>
      {error && (
        <p className="flex items-center text-sm text-red-500">
          <ShieldClose size={15} className="mr-1" />
          {error}
        </p>
      )}
    </>
  );
};

export default ValidationErrorBlock;
