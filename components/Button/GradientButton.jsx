import { Button } from "@chakra-ui/react";

export const GradientButton = ({ buttonText, ...rest }) => {
  return (
    <Button
      _hover={{ bg: "linear-gradient(270deg, rgba(32, 195, 255, 0.65) -0.16%, rgba(178, 54, 53, 0.65) 104.53%)" }}
      _focus={{ bg: "" }}
      borderRadius={"full"}
      color="white"
      textTransform={'uppercase'}
      letterSpacing={{base: ".06em", md: ".12em"}}
      bg="linear-gradient(270deg, rgba(32, 195, 255, 0.45) -0.16%, rgba(178, 54, 53, 0.45) 104.53%)"
      {...rest}
    >
      {buttonText}
    </Button>
  );
};
