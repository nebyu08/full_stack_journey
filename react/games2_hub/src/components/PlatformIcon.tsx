import { Platform } from "../hooks/useGames";
import { HStack, Icon } from "@chakra-ui/react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";

import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

interface Props {
  platforms: Platform[];
}

const PlatformIcon = ({ platforms }: Props) => {
    const iconMap:{[key:string]:IconType} ={
        pc:FaWindows,
        playstation:FaPlaystation,
        xbox:FaXbox,
        apple:FaApple,
        linux:FaLinux,
        andriod:FaAndroid,
        mac:FaApple,
        ios:MdPhoneIphone,
        web:BsGlobe,
        nintendo:SiNintendo
    }
  return (
    <HStack marginY={2} >
      {platforms.map((platform) => (
        <Icon key={platform.id} as={iconMap[platform.slug]} color='gray.500' />
      ))}
    </HStack>
  );
};

export default PlatformIcon;
