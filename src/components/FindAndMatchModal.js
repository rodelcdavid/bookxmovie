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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenModal,
  setSelectedBook,
  setSelectedMovie,
} from "../features/findSlice";
import FindAndMatch from "./FindAndMatch";

const FindAndMatchModal = () => {
  /* Redux */
  const { openModal } = useSelector((state) => state.findState);
  const dispatch = useDispatch();

  return (
    <Box>
      <Button
        onClick={() => {
          dispatch(setOpenModal(true));
          // Reset
          dispatch(setSelectedBook(null));
          dispatch(setSelectedMovie(null));
        }}
        pos="fixed"
        bottom="20px"
        right="20px"
        borderRadius="100%"
        w="60px"
        h="60px"
        fontWeight="bolder"
        fontSize="1.3rem"
        zIndex="3"
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
