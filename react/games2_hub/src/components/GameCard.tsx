import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
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
    <Card >
        <Image src={ getCropedImageUrl(game.background_image)} />
        <CardBody>
            <HStack justifyContent='space-between' marginBottom={3} >
                <PlatformIcon platforms={game.parent_platforms.map(p => p.platform ) } />
                <CriticScore score={game.metacritic} />
            </HStack>
            <Heading fontSize={'3xl'}>{game.name} </Heading>
        </CardBody>
    </Card>
  )
}

export default GameCard;