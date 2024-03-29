import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenEditVoteModal } from "../features/matchupsSlice";
import { useUpdateVoteMutation } from "../services/matchupsApi";

const EditVoteModal = () => {
  /* Local State */
  const [bookVotes, setBookVotes] = useState(0);
  const [movieVotes, setMovieVotes] = useState(0);

  /* Redux */
  const { selectedMatchup, openEditVoteModal } = useSelector(
    (state) => state.matchupsState
  );
  const [updateVote, { isLoading }] = useUpdateVoteMutation();
  const dispatch = useDispatch();

  /* Handlers */
  const handleEditVote = async (matchupId, bookVotes, movieVotes) => {
    await updateVote({
      matchupId,
      bookVotes: Number(bookVotes),
      movieVotes: Number(movieVotes),
    });
    if (!isLoading) {
      dispatch(setOpenEditVoteModal(false));
    }
  };

  /* Useeffects */
  useEffect(() => {
    if (selectedMatchup) {
      setBookVotes(selectedMatchup.bookVotes);
      setMovieVotes(selectedMatchup.movieVotes);
    }
  }, [selectedMatchup]);

  return (
    <Modal
      isOpen={openEditVoteModal}
      preserveScrollBarGap={true}
      onClose={() => {
        dispatch(setOpenEditVoteModal(false));
      }}
      isCentered
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader
            fontSize="lg"
            fontWeight="bold"
            borderBottom="1px solid teal"
          >
            Edit Votes
          </ModalHeader>

          <ModalBody>
            <Box display="flex" justifyContent="space-around">
              <Heading>
                {((bookVotes / (bookVotes + movieVotes)) * 100).toFixed(2)}%
              </Heading>
              <Heading>
                {((movieVotes / (bookVotes + movieVotes)) * 100).toFixed(2)}%
              </Heading>
            </Box>
            <Box marginTop="0.5rem" display="flex" alignItems="center">
              <FormControl display="flex" flexDir="column" alignItems="center">
                <FormLabel htmlFor="edit-book-votes">Book votes:</FormLabel>
                <NumberInput
                  onChange={(value) => setBookVotes(Number(value))}
                  id="edit-book-votes"
                  size="md"
                  maxW={24}
                  min={0}
                  value={bookVotes}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Text textAlign="center">Total: {bookVotes + movieVotes}</Text>
              <FormControl display="flex" flexDir="column" alignItems="center">
                <FormLabel htmlFor="edit-movie-votes">Movie votes:</FormLabel>
                <NumberInput
                  onChange={(value) => setMovieVotes(Number(value))}
                  id="edit-movie-votes"
                  size="md"
                  maxW={24}
                  min={0}
                  value={movieVotes}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => dispatch(setOpenEditVoteModal(false))}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleEditVote(selectedMatchup.id, bookVotes, movieVotes);
              }}
              isLoading={isLoading}
              colorScheme="red"
              ml={3}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default EditVoteModal;
