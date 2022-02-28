import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import FindAndMatch from "./FindAndMatch";

const FindAndMatchModal = () => {
  const [openModal, setOpenModal] = useState(false);

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
        onClick={() => setOpenModal(true)}
        colorScheme="teal"
      >
        +
      </Button>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        size="xl"
        preserveScrollBarGap
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize="lg" fontWeight="bold">
              Find and Match
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Text>Match book with its respective movie adaptation.</Text>
              <FindAndMatch setOpenModal={setOpenModal} />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default FindAndMatchModal;
