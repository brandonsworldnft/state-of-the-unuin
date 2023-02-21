import { Stack, Box } from "@chakra-ui/react";

export const Description = () => {
  return (
    <Stack pt={{ base: "100px", md: "155px" }} textAlign={{ base: "center", md: "start" }}>
      <Stack spacing={{ base: "-5", md: "-7" }}>
        <Box color="#080605" fontSize={{ base: "54px", md: "50px", lg: "72px", xl: "86px" }}>
          The State of the Union,
        </Box>
        <Box fontSize={{ base: "48px", md: "48px", lg: "54px", xl: "74px" }}>
          <Box as="span" color="#B23635">
            Eternally{" "}
          </Box>
          <Box as="span" color="#2687AB">
            Blockchained
          </Box>
        </Box>
      </Stack>
      <Box
        fontFamily="Helvetica"
        color="#141414"
        letterSpacing="0.005em"
        fontSize={{
          base: "16px",
          md: "16px",
          lg: "18px",
        }}
        lineHeight={{
          base: "22px",
          md: "31px",
        }}
        maxW="lg"
      >
        A 10 series collection of 10,000 strategically crafted comical art reflecting The State of the Union
        and the frustrations of the voting class, who&apos;s rights to life, liberty and the pursuit of
        happiness have been hijacked by a globalist gang of elite fraudsters, warmongers, pedophiles, and
        profiteers, all with the help of fake news media, high tech, big pharma, and sell out celebs.
        Consisting of 10 releases, each release depicting a scene highlighted to represent an unforgivable
        failure of the current administration.
      </Box>
    </Stack>
  );
};
