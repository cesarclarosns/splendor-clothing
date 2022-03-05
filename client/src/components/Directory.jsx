import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectSections } from "../features/directory/directorySelectors";

import { Center, Grid } from "@chakra-ui/react";
import DirectoryMenuItem from "./DirectoryMenuItem";

function Directory({ sections }) {
  return (
    <Center>
      <Grid
        pb="2rem"
        width="full"
        templateRows={["repeat(5, 1fr)", null, "repeat(2, 1fr)"]}
        templateColumns={["1fr", null, "repeat(6, 1fr)"]}
        gap={4}
      >
        {sections.map(({ id, colSpan, ...otherSectionProps }) => (
          <DirectoryMenuItem
            key={id}
            colStart="auto"
            colSpan={[1, null, colSpan]}
            collection={otherSectionProps}
            w="full"
            h="full"
          />
        ))}
      </Grid>
    </Center>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectSections,
});

export default connect(mapStateToProps)(Directory);
