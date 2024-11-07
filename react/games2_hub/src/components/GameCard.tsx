import { Card, CardBody, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Game } from "../hooks/useGames"
import PlatformIcon from "./PlatformIcon";
import CriticScore from "./CriticScore";
import getCropedImageUrl from "../services/img-url";

interface Props{
    game:Game;
}

function GameCard({game}:Props) {
//   console.log(game.);
  return (
    <Card width="300px" borderRadius={10} overflow="hidden" >
        <Image src={ getCropedImageUrl(game.background_image)} />
        <CardBody>
            <Heading fontSize={'3xl'}>{game.name} </Heading>
            <HStack justifyContent='space-between' >
                <PlatformIcon platforms={game.parent_platforms.map(p => p.platform ) } />
                <CriticScore score={game.metacritic} />
            </HStack>
        </CardBody>
    </Card>
  )
}

export default GameCard;