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
import Login from "./Login";
import SignUp from "./SignUp";

const AccessDialog = ({ openDialog, setOpenDialog, initialTab }) => {
  const cancelRef = useRef();
  return (
    <>
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
              Log In or Sign Up
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <Box
                border="1px solid #000"
                borderRadius="10px"
                minHeight="30rem"
              >
                <Tabs
                  defaultIndex={initialTab === "login" ? 0 : 1}
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
                      <Login />
                    </TabPanel>
                    <TabPanel>
                      <SignUp />
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
