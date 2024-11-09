import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

function GameGrid() {
  const { games, error, isLoading } = useGames();
  const skeletons = [];

  for (let i = 0; i <= 20; i++) {
    skeletons.push(i);
  }

  return (
    <>
      {error && <Text>{error} </Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding={10}
        spacing={10}
      >
        {isLoading &&
          skeletons.map((Skeleton) => (
            <GameCardContainer>
              <GameCardSkeleton key={Skeleton} />
            </GameCardContainer>
          ))}
        {games.map((game) => (
          <GameCardContainer>
            <GameCard key={game.id} game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
}

export default GameGrid;
