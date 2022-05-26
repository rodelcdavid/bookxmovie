import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useAddVoteMutation,
  useDeleteMatchupMutation,
} from "../services/matchupsApi";
import { toastList } from "../utils/toastList";
import Book from "./Book";
import Movie from "./Movie";
import vs from "../assets/vs.png";

const MatchupCard = ({
  matchup,
  userId,
  setOpenAccessDialog,
  setOpenEditVoteModal,
  setSelectedMatchup,
}) => {
  //View stats state
  const [isStatsVisible, setIsStatsVisible] = useState(false);

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
      setIsStatsVisible(true);
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
    if (!isStatsVisible) {
      return "Which one's better?";
    }
    if (bookVotes > movieVotes) {
      return "BOOK was better!";
    } else if (movieVotes > bookVotes) {
      return "MOVIE was better!";
    } else if (movieVotes + bookVotes === 0) {
      return "No votes yet";
    } else {
      return "BOTH were great!";
    }
  };

  useEffect(() => {
    setIsStatsVisible(false);
  }, [userId]);

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
          <Heading
            size="md"
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.87)",
              width: "75%",
              margin: "0 auto",
              position: "relative",
              paddingBottom: "0.2rem",
            }}
          >
            {whichWasBetter(matchup.bookVotes, matchup.movieVotes)}
          </Heading>
          <Text sx={{ fontSize: "0.75rem" }}>
            Total votes:{" "}
            {isStatsVisible ? matchup.bookVotes + matchup.movieVotes : "—"}
          </Text>
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
            isStatsVisible={isStatsVisible}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "24px",
            }}
          >
            <Tooltip
              label={isStatsVisible ? "Hide stats" : "Show stats"}
              hasArrow
              placement="top"
            >
              <Button
                onClick={() =>
                  userId === "guest"
                    ? handleVote()
                    : setIsStatsVisible((prev) => !prev)
                }
                colorScheme="teal"
                variant="outline"
                size="xs"
              >
                {isStatsVisible ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </Tooltip>
            <Image
              src={vs}
              alt=""
              width="100px"
              position="absolute"
              zIndex="1"
              top="9rem"
              left="50%"
              transform="translateX(-53%)"
            />

            {/* Movie */}
          </Box>
          <Movie
            matchup={matchup}
            userId={userId}
            isVoting={isVoting}
            handleVote={handleVote}
            votePercentage={votePercentage}
            isStatsVisible={isStatsVisible}
          />
        </Box>
        {userId === 1 && (
          <>
            <Button
              colorScheme="teal"
              onClick={() => {
                setSelectedMatchup(matchup);
                setOpenEditVoteModal(true);
              }}
              size="xs"
              sx={{
                position: "absolute",
                right: 2,
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
                right: 2,
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
