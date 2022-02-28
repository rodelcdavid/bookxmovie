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
import { useUpdateVoteMutation } from "../services/matchesApi";

const EditVoteDialog = ({
  openEditVoteDialog,
  setOpenEditVoteDialog,
  selectedMatchup,
}) => {
  const [bookVotes, setBookVotes] = useState(0);
  const [movieVotes, setMovieVotes] = useState(0);

  useEffect(() => {
    if (selectedMatchup) {
      setBookVotes(selectedMatchup.bookVotes);
      setMovieVotes(selectedMatchup.movieVotes);
    }
  }, [selectedMatchup]);

  const [updateVote, { isLoading }] = useUpdateVoteMutation();

  const handleEditVote = async (matchId, bookVotes, movieVotes) => {
    await updateVote({
      matchId,
      bookVotes: Number(bookVotes),
      movieVotes: Number(movieVotes),
    });
    if (!isLoading) {
      setOpenEditVoteDialog(false);
    }
  };

  return (
    <Modal
      isOpen={openEditVoteDialog}
      preserveScrollBarGap={true}
      onClose={() => {
        setOpenEditVoteDialog(false);
      }}
      isCentered
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="bold">
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
                  id="edit-book-votes"
                  size="md"
                  maxW={24}
                  min={0}
                  value={bookVotes}
                  onChange={(value) => setBookVotes(Number(value))}
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
                  id="edit-movie-votes"
                  size="md"
                  maxW={24}
                  min={0}
                  value={movieVotes}
                  onChange={(value) => setMovieVotes(Number(value))}
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
            <Button onClick={() => setOpenEditVoteDialog(false)}>Cancel</Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={() => {
                handleEditVote(selectedMatchup.id, bookVotes, movieVotes);
              }}
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

export default EditVoteDialog;
