import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/ui/submit-button";
import timeHelper from "@/helpers/time.helper";
import type { AvailableSession } from "@prisma/client";
import { memo, useMemo, useState } from "react";

type Props = {
  onBooking: (session: AvailableSession) => Promise<void>;
  session: AvailableSession | null;
  loading: boolean;
  isDisabled: boolean;
};
const BookConfirmationAlert: React.FC<Props> = ({
  onBooking,
  session,
  loading,
  isDisabled,
}) => {
  const [open, setOpen] = useState(false);

  const time = useMemo(() => {
    if (!session) return "";
    return `${timeHelper.convertDateToTime(session.date).hours}:00 ${
      timeHelper.convertDateToTime(session.date).ampm
    }`;
  }, [session]);

  return (
    <AlertDialog open={open} onOpenChange={(value) => setOpen(value)}>
      <Button
        onClick={() => setOpen(true)}
        disabled={!session?.id || isDisabled}
        className="w-full"
      >
        حجز جلسة
      </Button>
      <AlertDialogContent className="items-start text-right">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">
            {"هل انت متاكد؟"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            <span>{" هذا الخيار لا يمكن التراجع عنه "} </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <p> موعد الحجز {time}</p>

        <section className="flex items-center justify-end gap-2">
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
            <form
              onSubmit={async (e) => {
                if (!session?.id) return;
                e.preventDefault();
                await onBooking(session);
                setOpen(false);
              }}
            >
              <SubmitButton
                className="w-20"
                disabled={!session?.id}
                loading={loading}
                loadingTitle="جاري الحجز"
              >
                {"حجز"}
              </SubmitButton>
            </form>
          </div>
        </section>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(BookConfirmationAlert);
