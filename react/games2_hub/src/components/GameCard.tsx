import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGames"

interface Props{
    game:Game;
}

function GameCard({game}:Props) {
  return (
    <Card borderRadius={10} overflow={'hidden'} padding={10} >
        <Image src={game.background_image} />
        <CardBody>
            <Heading fontSize={'3xl'}>{game.name} </Heading>
        </CardBody>
    </Card>
  )
}

export default GameCard;