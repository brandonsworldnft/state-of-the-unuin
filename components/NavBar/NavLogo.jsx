import { HStack, Box } from "@chakra-ui/react"
import Link from "next/link"

export const NavLogo = () => {
  return(
    <Link href="/">
      <HStack textTransform={'uppercase'} fontSize={{base: "22px", md: "36px", lg: "48px"}} spacing='0' gap={{base: "1", md: "2"}} letterSpacing="0.05em">
        <Box as={'span'} color='#B33635'>Brandons</Box>
        <Box as={'span'} color='#FDFDFD'>world</Box>
        <Box as={'span'} color='#2687AB'>nfts</Box>
      </HStack>
    </Link>
  )
}