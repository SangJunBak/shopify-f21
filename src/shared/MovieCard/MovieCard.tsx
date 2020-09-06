import { white } from "constants/colors";
import { flexCol } from "constants/mixins";
import React, { FC } from "react";
import { Button } from "shared/Button/Button";
import { Card } from "shared/Card/Card";
import { Subtitle } from "shared/Subtitle/Subtitle";
import styled from "styled-components/macro";
import { OpenInNew } from "@material-ui/icons";

type MovieCardProps = {};

const SAMPLE_MOVIE = {
  poster:
    "https://m.media-amazon.com/images/M/MV5BMTg0NTM3MTI1MF5BMl5BanBnXkFtZTgwMTAzNTAzNzE@._V1_SX300.jpg",
  title: "Hello, My Name Is Doris",
  type: "movie",
  year: "2015",
  id: "tt3766394",
};

const StyledCard = styled(Card)`
  background-color: ${white};
  display: flex;
  height: 9rem;
  max-width: 25rem;
`;

const StyledOpenInNew = styled(OpenInNew)`
  && {
    font-size: 1rem;
    margin-left: 0.25rem;
  }
`;

const SecondaryButton = styled(Button)`
  margin-left: 1rem;
`;

const Image = styled.img`
  flex: 0 0 auto;
  max-height: 100%;
  border-radius: 0.25rem 0 0 0.25rem;
`;

const Content = styled.div`
  ${flexCol};
  flex: 1;
  padding: 1rem;
  justify-content: space-between;
`;

const Description = styled.div`
  ${flexCol};
  flex: 1;
`;

const Title = styled.h5`
  margin: 0;
  display: flex;
  overflow-y: auto;
  max-height: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const createIMDBLink = (imdbID: string): string =>
  `https://www.imdb.com/title/${imdbID}`;

export const MovieCard: FC<MovieCardProps> = (props) => {
  return (
    <StyledCard>
      <Image src={SAMPLE_MOVIE.poster} alt={""} />
      {/*TODO: Create alt and placeholder*/}
      <Content>
        <Description>
          <Title>
            {SAMPLE_MOVIE.title}
            <a
              href={createIMDBLink(SAMPLE_MOVIE.id)}
              target="_blank"
              rel="noopener noreferrer"
              title="IMDB Link"
            >
              <StyledOpenInNew />
            </a>
          </Title>
          <Subtitle>({SAMPLE_MOVIE.year})</Subtitle>
        </Description>
        <ButtonContainer>
          <Button size="small">Nominate</Button>
          <SecondaryButton size="small">More Info</SecondaryButton>
        </ButtonContainer>
      </Content>
    </StyledCard>
  );
};
