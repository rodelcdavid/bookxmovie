import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import {
  useAddVoteMutation,
  useRemoveVoteMutation,
  useDeleteMatchupMutation,
} from "../services/matchupsApi";
import { toastList } from "../utils/toastList";
import Book from "./Book";
import Movie from "./Movie";
import vs from "../assets/vs.png";
import { useDispatch } from "react-redux";
import { setOpenAccessDialog } from "../features/authSlice";
import {
  setOpenEditVoteModal,
  setSelectedMatchup,
} from "../features/matchupsSlice";
import { useSelector } from "react-redux";

const MatchupCard = ({ matchup, userId }) => {
  console.log("rendered");

  /* Local state */
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  /* Redux */
  const [removeVote] = useRemoveVoteMutation();
  const [deleteMatchup] = useDeleteMatchupMutation();
  const [addVote, { isSuccess: voted, isLoading: isVoting }] =
    useAddVoteMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authState);

  /* Utils */
  const toast = useToast();

  /* Handlers */
  const handleVote = async (matchupId, votedFor) => {
    if (userId === "guest") {
      //open login dialog
      dispatch(setOpenAccessDialog(true));
      toast(toastList.accessToast);
      //proceed vote
    } else {
      await addVote({ userId, matchupId, votedFor });
      toast(toastList.voteToast);
      setTimeout(() => {
        setIsStatsVisible(true);
      }, 200);
    }
  };

  const handleRemoveVote = async (matchupId, votedFor) => {
    await removeVote({
      matchupId,
      userId,
      votedFor,
    });
    toast(toastList.removeVoteToast);
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

  /* Useeffects */
  useEffect(() => {
    setIsStatsVisible(false);
  }, [userId]);

  return (
    <>
      <Box
        boxShadow="0 5px 10px rgba(0,0,0,0.6)"
        borderRadius="10px"
        w="300px"
        overflow="hidden"
        bgColor="#fff"
        pos="relative"
      >
        <Box
          textAlign="center"
          bgColor="#FFDE7D"
          color="rgba(0,0,0,0.87)"
          pos="relative"
          h="4rem"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            size="md"
            borderBottom="1px solid rgba(0,0,0,0.87)"
            w="75%"
            m="0 auto"
            pos="relative"
            paddingBottom="0.2rem"
          >
            {whichWasBetter(matchup.bookVotes, matchup.movieVotes)}
          </Heading>
          <Text fontSize="0.75rem">
            Total votes:{" "}
            {isStatsVisible ? matchup.bookVotes + matchup.movieVotes : "—"}
          </Text>
        </Box>
        <Box
          padding="0.5rem 0"
          display="flex"
          justifyContent="center"
          textAlign="center"
        >
          {/* Book */}
          <Book
            matchup={matchup}
            userId={userId}
            isVoting={isVoting}
            handleVote={handleVote}
            votePercentage={votePercentage}
            isStatsVisible={isStatsVisible}
            voted={voted}
          />

          <Box display="flex" flexDir="column" w="24px">
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

        {/* open when: clicked, remove vote or delete, close after */}
        {userId !== "guest" && (
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  isActive={isOpen}
                  as={IconButton}
                  size="lg"
                  icon={<FiMoreVertical />}
                  bg="transparent"
                  style={{ opacity: 1 }}
                  _active={{ backgroundColor: "rgba(0,0,0,0.10)" }}
                  pos="absolute"
                  right="0"
                  top="12px"
                  borderRadius="100%"
                  bgColor="#FFDE7D"
                  _focus={{ boxShadow: "none", backgroundColor: "#FFDE7D" }}
                  _hover={{ backgroundColor: "rgba(0,0,0,0.10)" }}
                />

                <MenuList
                  sx={{
                    "& span": {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => setIsStatsVisible((prev) => !prev)}
                    icon={isStatsVisible ? <ViewOffIcon /> : <ViewIcon />}
                  >
                    {isStatsVisible ? "Hide" : "Show"} Stats
                  </MenuItem>
                  {matchup.votedFor && (
                    <MenuItem
                      onClick={() =>
                        handleRemoveVote(matchup.id, matchup.votedFor)
                      }
                      icon={<CloseIcon />}
                    >
                      Remove Vote
                    </MenuItem>
                  )}

                  {user.id === 1 && (
                    <>
                      <MenuItem
                        onClick={() => {
                          dispatch(setSelectedMatchup(matchup));
                          dispatch(setOpenEditVoteModal(true));
                        }}
                        icon={<EditIcon />}
                      >
                        Edit Votes
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDelete(matchup.id)}
                        icon={<DeleteIcon />}
                        color="red"
                      >
                        Delete
                      </MenuItem>
                    </>
                  )}
                </MenuList>
              </>
            )}
          </Menu>
        )}
      </Box>
    </>
  );
};

export default React.memo(MatchupCard);
