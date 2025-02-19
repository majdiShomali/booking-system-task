import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/ui/submit-button";
import { useState } from "react";

type Props = {
  loading: boolean;
  disabled: boolean;
  info: string;
};
const BookConfirmationAlert: React.FC<Props> = ({
  loading,
  disabled,
  info,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={(value) => setOpen(value)}>
      <AlertDialogTrigger className="w-full">
        <Button className="w-full py-3 text-lg" disabled={disabled || loading}>
          حجز جلسة
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="items-start text-right">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            {"هل انت متاكد؟"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            <p>{" هذا الخيار لا يمكن التراجع عنه "} </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p> موعد الحجز {info}</p>

        <AlertDialogFooter className="gap-2 flex items-center justify-end">
            <div className="flex items-center justify-center gap-2">
          <Button
            className="w-20"
            onClick={() => {
              setOpen(false);
            }}
            variant={"outline"}
          >
            {"الغاء"}
          </Button>

          <SubmitButton
           className="w-20"
            disabled={disabled || loading}
            loading={loading}
            loadingTitle="جاري الحجز"
          >
            {"حجز"}
          </SubmitButton>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookConfirmationAlert;
