import Head from "next/head";
import { NavBar } from "@/components/NavBar/NavBar";
import { Box, HStack } from "@chakra-ui/react";
import { Description } from "@/components/Description/Description";
import { MintBox } from "@/components/Mint/MintBox";

export default function Home() {
  return (
    <>
      <Head>
        <title>Brandons World NFTs</title>
        <meta name="description" content="Brandon's World NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="preload" href="/images/sm-bg.svg" as="image" />
        <link rel="preload" href="/images/lg-bg.svg" as="image" />
      </Head>

      <NavBar />
      <Box fontFamily={"DrukCond"} overflowX={"hidden"} mx="auto" bgColor="rgb(227,227,227)">
        <Box
          // mt={{ base: "6", md: "0" }}
          mx="auto"
          bgImage={{ base: "/images/sm-bg.svg", md: "/images/lg-bg.svg" }}
          bgSize={`contain`}
          bgPos={"center"}
          bgRepeat="no-repeat"
          w="100vw"
          h="100vh"
          align={{ base: "start", md: "center" }}
          justifyContent="center"
        >
          <HStack
            pt="6"
            pb="8rem"
            px="6"
            w="full"
            mx="auto"
            maxW="2000px"
            justifyContent={"space-between"}
            spacing="0"
            gap="6"
            align={"center"}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Description />
            <MintBox />
          </HStack>
        </Box>
      </Box>
    </>
  );
}
