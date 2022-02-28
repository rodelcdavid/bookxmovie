import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import React from "react";
import {
  useAddVoteMutation,
  useDeleteMatchupMutation,
} from "../services/matchupsApi";
import { toastList } from "../utils/toastList";
import Book from "./Book";
import Movie from "./Movie";

const MatchupCard = ({
  matchup,
  userId,
  setOpenAccessDialog,
  setOpenEditVoteDialog,
  setSelectedMatchup,
}) => {
  //Async actions
  const [deleteMatchup, { isLoading: isDeleting }] = useDeleteMatchupMutation();
  const [addVote, { isLoading: isVoting }] = useAddVoteMutation();

  const toast = useToast();

  const handleVote = async (matchupId, votedFor) => {
    if (userId === "guest") {
      //open login dialog
      setOpenAccessDialog(true);
      toast(toastList.accessToast);
      //proceed vote
    } else {
      await addVote({ userId, matchupId, votedFor });
      toast(toastList.voteToast);
    }
  };

  const handleDelete = async (matchupId) => {
    await deleteMatchup({ matchupId });
    toast(toastList.deleteToast);
  };

  const votePercentage = (bookVotes, movieVotes, type) => {
    if (bookVotes + movieVotes !== 0) {
      if (type === "book") {
        const percentage = (
          (bookVotes / (bookVotes + movieVotes)) *
          100
        ).toFixed(2);
        return percentage;
      } else {
        const percentage = (
          (movieVotes / (bookVotes + movieVotes)) *
          100
        ).toFixed(2);
        return percentage;
      }
    } else {
      return 0;
    }
  };

  const whichWasBetter = (bookVotes, movieVotes) => {
    if (bookVotes > movieVotes) {
      return "BOOK was better";
    } else if (movieVotes > bookVotes) {
      return "MOVIE was better";
    } else if (movieVotes + bookVotes === 0) {
      return "No votes yet";
    } else {
      return "BOTH were great";
    }
  };

  return (
    <>
      <Box
        sx={{
          boxShadow: "0 5px 10px rgba(0,0,0,0.6)",
          borderRadius: "10px",
          width: "300px",
          overflow: "hidden",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            margin: "0 auto",
            backgroundColor: "#FFDE7D",
            color: "rgba(0,0,0,0.87)",
            padding: "0.5rem",
            height: "4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userId === "guest" ? (
            <Button
              variant="solid"
              colorScheme="teal"
              onClick={handleVote}
              fontSize="lg"
              fontWeight="bold"
              cursor="pointer"
              width="100%"
            >
              Reveal Stats
            </Button>
          ) : (
            <>
              <Heading
                size="md"
                sx={{
                  borderBottom: "1px solid rgba(0,0,0,0.87)",
                  width: "70%",
                  margin: "0 auto",
                }}
              >
                {whichWasBetter(matchup.bookVotes, matchup.movieVotes)}
              </Heading>
              <Text sx={{ fontSize: "0.75rem" }}>
                Total votes: {matchup.bookVotes + matchup.movieVotes}
              </Text>
            </>
          )}
        </Box>
        <Box
          sx={{
            padding: "0.5rem 0",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Book */}
          <Book
            matchup={matchup}
            userId={userId}
            isVoting={isVoting}
            handleVote={handleVote}
            votePercentage={votePercentage}
          />

          <Heading
            size="lg"
            sx={{ marginTop: "8.5rem", color: "rgba(0,0,0,0.87)" }}
          >
            VS
          </Heading>

          {/* Movie */}
          <Movie
            matchup={matchup}
            userId={userId}
            isVoting={isVoting}
            handleVote={handleVote}
            votePercentage={votePercentage}
          />
        </Box>
        {userId === 2 && (
          <>
            <Button
              colorScheme="teal"
              onClick={() => {
                setSelectedMatchup(matchup);
                setOpenEditVoteDialog(true);
              }}
              size="xs"
              sx={{
                position: "absolute",
                right: 1,
                top: 1,
              }}
            >
              <EditIcon />
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDelete(matchup.id)}
              isLoading={isDeleting}
              size="xs"
              sx={{
                position: "absolute",
                right: 1,
                top: "37px",
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default MatchupCard;
