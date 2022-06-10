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
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModal,
  setSelectedBook,
  setSelectedMovie,
} from "../features/findSlice";
import FindAndMatch from "./FindAndMatch";

const FindAndMatchModal = () => {
  const { openModal } = useSelector((state) => state.findState);
  const dispatch = useDispatch();

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
        onClick={() => {
          dispatch(setOpenModal(true));
          // Reset
          dispatch(setSelectedBook(null));
          dispatch(setSelectedMovie(null));
        }}
        colorScheme="teal"
      >
        +
      </Button>

      <Modal
        isOpen={openModal}
        onClose={() => dispatch(setOpenModal(false))}
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
              <FindAndMatch />
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default FindAndMatchModal;
