import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Character } from "../api";

type Props = Character & {
  image: string;
};

export function CharacterCard({ image, name }: Props) {
  return (
    <Box width={325}>
      <Card>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Mock image"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>{name}</CardContent>
      </Card>
    </Box>
  );
}
