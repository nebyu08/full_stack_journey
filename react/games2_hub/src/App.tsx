import { Grid, GridItem, Show } from "@chakra-ui/react";
import NabBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" `,
        lg: `"nav nav " "aside main" `,
      }}
    >
      <GridItem area="nav">
        <NabBar/>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
          <GenreList/>
        </GridItem>
      </Show>
      <GridItem area="main">
        <GameGrid/>
      </GridItem>
    </Grid>
  );
}

export default App;
