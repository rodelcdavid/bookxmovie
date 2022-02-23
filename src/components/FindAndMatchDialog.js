import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import FindAndMatch from "./FindAndMatch";

const FindAndMatchDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const cancelRef = useRef();

  return (
    <Box>
      <Button
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "100%",
          width: "60px",
          height: "60px",
          fontWeight: "bolder",
          fontSize: "1.3rem",
          zIndex: 3,
        }}
        onClick={() => setOpenDialog(true)}
        colorScheme="teal"
      >
        +
      </Button>

      <AlertDialog
        isOpen={openDialog}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpenDialog(false)}
        size="xl"
        isCentered
        preserveScrollBarGap
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Find and Match
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <Text>Match book with its respective movie adaptation.</Text>
              <FindAndMatch setOpenDialog={setOpenDialog} />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default FindAndMatchDialog;
