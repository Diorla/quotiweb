import styled from "@emotion/styled";
import { Card, Typography, Skeleton } from "@mui/material";

const StyledCard = styled(Card)`
  min-width: 240px;
  justify-content: space-evenly;
  margin: 8px;
`;

export default function CardSkeleton() {
  return (
    <StyledCard>
      <Typography>
        <Skeleton variant="rectangular" />
      </Typography>
      <Typography sx={{ marginBottom: 2, marginTop: 2 }}>
        <Skeleton variant="rectangular" />
      </Typography>
      <Typography>
        <Skeleton variant="rectangular" />
      </Typography>
    </StyledCard>
  );
}
