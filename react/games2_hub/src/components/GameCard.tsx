import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { Game } from "../hooks/useGames"
import PlatformIcon from "./PlatformIcon";

interface Props{
    game:Game;
}

function GameCard({game}:Props) {
//   console.log(game.);
  return (
    <Card borderRadius={10} overflow={'hidden'} padding={10} >
        <Image src={game.background_image} />
        <CardBody>
            <Heading fontSize={'3xl'}>{game.name} </Heading>
            <PlatformIcon platforms={game.parent_platforms.map(p => p.platform ) } />
        </CardBody>
    </Card>
  )
}

export default GameCard;