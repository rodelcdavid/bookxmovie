import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAccessDialog } from "../features/authSlice";
import Login from "./Login";
import SignUp from "./SignUp";

const AccessDialog = ({ tabIndex, setTabIndex }) => {
  const { openAccessDialog } = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const cancelRef = useRef();
  return (
    <>
      <AlertDialog
        isOpen={openAccessDialog}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          dispatch(setOpenAccessDialog(false));
          setTabIndex(0);
        }}
        preserveScrollBarGap
      >
        <AlertDialogOverlay>
          <AlertDialogContent margin="auto 0.5rem">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log In or Sign Up
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <Box
                border="3px solid teal"
                borderRadius="10px"
                // minHeight="20rem"
              >
                <Tabs
                  onChange={(index) => setTabIndex(index)}
                  index={tabIndex}
                  defaultIndex={0}
                  isFitted
                  variant="enclosed"
                  colorScheme="green"
                >
                  <TabList>
                    <Tab>Log In</Tab>
                    <Tab>Sign Up</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Login setTabIndex={setTabIndex} />
                    </TabPanel>
                    <TabPanel>
                      <SignUp setTabIndex={setTabIndex} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AccessDialog;
