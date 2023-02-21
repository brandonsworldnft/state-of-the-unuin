import { Box, HStack, Stack, useMediaQuery } from "@chakra-ui/react";
import { Connect } from "../Connect/Connect";
import { Links } from "./Links";
import { NavLogo } from "./NavLogo";

export const NavBar = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");

  return (
    <Box
      fontFamily={"DrukCond"}
      bg={"linear-gradient(180deg, #1F201F 0%, #000000 100%)"}
      w="full"
      px="25px"
      zIndex={"5"}
      position={"fixed"}
      top="0"
      left="0"
    >
      <Box maxW="8xl" mx="auto">
        <Stack
          align={"center"}
          justifyContent="space-between"
          transition={"all 0.25s ease-out"}
          // h={{ base: "100px", md: "135px" }}
          minH="fit-content"
          py={{ base: "4", md: "6" }}
          spacing="2"
        >
          <HStack
            direction="row"
            justifyContent={{
              base: "space-between",
              sm: "space-around",
              md: "space-around",
              lg: "space-between",
            }}
            align="center"
            alignSelf="stretch"
            position={"relative"}
            pb={{ base: "1", md: "0" }}
          >
            <NavLogo />

            {isLargerThan992 ? <Links /> : <Box h="20px" bg="#45494D" w="1px" />}

            <Connect />
          </HStack>
          {!isLargerThan992 && <Links />}
        </Stack>
      </Box>
    </Box>
  );
};
