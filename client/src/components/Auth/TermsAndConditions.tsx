import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface TermsAndConditionsProps {
  isOpen: boolean;
  handleClose: () => void;
  onAgree: () => void; // Callback for agreement
}

export default function TermsAndConditions({
  isOpen,
  handleClose,
  onAgree,
}: TermsAndConditionsProps) {
  const [open, setOpen] = React.useState(isOpen);
  const [isTermsConfirmed, setIsTermsConfirmed] = React.useState(false);

  // Update the open state when the prop changes
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleCloseDialog = () => {
    setOpen(false);
    // Call the handleClose function from the parent
  };

  const handleAgree = () => {
    onAgree(); // Call the parent's onAgree function
    handleClose(); // Close the dialog
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Letter of Consent
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            This experimantal work is conducted with EGE University
            International Computer Instiute All information stated as part of
            this experiment is confidential and will be kept as such. Professor
            Geylani Kardaş(http://akademik.ube.ege.edu.tr/~kardas/) and Burak
            Celik(bcburakcelik@gmail.com) are responsible for this experiment
            and can be contacted via email above. We would like to emhasize
            that;
          </Typography>
          <Typography gutterBottom>
            1. Your participation is entirely voluntary.
          </Typography>
          <Typography gutterBottom>
            2. You are free torefuse to answer any questions.
          </Typography>
          <Typography gutterBottom>
            3. You are free to withdraw any time.
          </Typography>
          <Typography gutterBottom>
            The experiment will be kept strictly, confidential and will be made
            available only to members of the research team of the study or in
            case external quality assessment takes place, to assessors under the
            same confidentiality conditions.Data collected in this experiment
            may be part of the final research report,but under no circumstances
            will your name or any identifying characterictic be included in the
            report
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
