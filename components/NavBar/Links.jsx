import { HStack, Link, Box } from "@chakra-ui/react"
import { Discord } from "../Icons/Discord"
import { Instagram } from "../Icons/Instagram"
import { OpenSea } from "../Icons/OpenSea"
import { Twitter } from "../Icons/Twitter"

export const Links = () => {
  return(
    <HStack spacing={{base: "2", md: "2"}}>
      <Item icon={<Twitter />} text="Twitter" />
      <Item icon={<OpenSea />} text="OpenSea" />
      <Item icon={<Instagram />} text="Instagram" />
      <Item icon={<Discord />} text="Discord" />
    </HStack>
  )
}

const Item = ({ icon, text, href }) => {
  return(
    <Link isExternal href={href}>
      <HStack align={'center'}>
        <Box w='20px'>{icon}</Box>
        <Box color='#E6E6E6' fontFamily={"Helvetica"} fontWeight='700'  fontSize={{base: "12px", md: "16px"}}>{text}</Box>
      </HStack>
    </Link>
  )
}