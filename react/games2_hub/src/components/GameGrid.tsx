import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

function GameGrid() {
  
  const {games,error,isLoading}=useGames();
  const skeletons=[];

  for(let i=0;i<=20;i++){
    skeletons.push(i);
  }

  return (
    <>
      {error && <Text>{error} </Text> }
      <SimpleGrid columns ={ {sm:1,md:2,lg:3,xl:4}} padding={10} spacing={10} >
        {isLoading && skeletons.map(Skeleton => <GameCardSkeleton key={Skeleton} />) }
        {games.map((game) => (
         <GameCard key={game.id} game={game}/>
        ))}
      </SimpleGrid>
    </>
  );
}

export default GameGrid;
