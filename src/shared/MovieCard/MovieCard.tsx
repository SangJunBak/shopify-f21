import { Skeleton } from "@material-ui/lab";
import { white } from "constants/colors";
import { flexCol } from "constants/mixins";
import {
  useNominationsDispatch,
  useNominationsState,
} from "context/nominations";
import React, { FC, useState } from "react";
import { Button } from "shared/Button/Button";
import { Card } from "shared/Card/Card";
import { Subtitle } from "shared/Subtitle/Subtitle";
import styled from "styled-components/macro";
import { OpenInNew } from "@material-ui/icons";
import { Movie } from "types/movie";

export const MOVIE_CARD_MIN_WIDTH_REM = 16;

type MovieCardProps = {
  className?: string;
  movie: Movie;
};

const StyledCard = styled(Card)`
  background-color: ${white};
  display: flex;
  height: 8rem;
  min-width: ${MOVIE_CARD_MIN_WIDTH_REM}rem;
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

const ImageContainer = styled.img<{ visible: boolean }>`
  flex: 0 0 auto;
  max-height: 100%;
  border-radius: 0.25rem 0 0 0.25rem;
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const Title = styled.h5`
  margin: 0;
  display: flex;
  overflow-y: auto;
  max-height: 3rem;
`;

const PLACEHOLDER_IMAGE_WIDTH_REM = 5.79;

const EmptyImage = styled.div`
  background-color: rgba(0, 0, 0, 0.11);
  display: flex;
  height: 100%;
  width: ${PLACEHOLDER_IMAGE_WIDTH_REM}rem;
  justify-content: center;
  align-items: center;
  color: ${white};
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Hyperlink = styled.a`
  color: #2196f3;
`;

const createIMDBLink = (imdbID: string): string =>
  `https://www.imdb.com/title/${imdbID}`;

export const MovieCard: FC<MovieCardProps> = (props) => {
  const { className = "", movie } = props;

  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { nominationsByID, isAtMaxCapacity } = useNominationsState();
  const dispatch = useNominationsDispatch();

  const isNominated = !!nominationsByID[movie.id];

  return (
    <StyledCard className={className}>
      <ImageContainer
        src={movie.poster}
        alt={movie.title}
        onLoad={() => setHasImageLoaded(true)}
        onError={() => setImageError(true)}
        visible={hasImageLoaded && !imageError}
      />
      {imageError ? (
        <EmptyImage>
          <span>N/A</span>
        </EmptyImage>
      ) : (
        !hasImageLoaded && (
          <Skeleton
            variant="rect"
            width={`${PLACEHOLDER_IMAGE_WIDTH_REM}rem`}
            height="100%"
          />
        )
      )}
      <Content>
        <Description>
          <Title>
            {movie.title}
            <Hyperlink
              href={createIMDBLink(movie.id)}
              target="_blank"
              rel="noopener noreferrer"
              title="IMDB Link"
            >
              <StyledOpenInNew />
            </Hyperlink>
          </Title>
          <Subtitle>({movie.year})</Subtitle>
        </Description>
        <ButtonContainer>
          {isNominated ? (
            <Button
              size="small"
              onClick={() =>
                dispatch?.({
                  type: "REMOVE_NOMINATION_BY_ID",
                  payload: { id: movie.id },
                })
              }
            >
              Remove
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() =>
                dispatch?.({ type: "APPEND_NOMINATION", payload: { movie } })
              }
              disabled={isAtMaxCapacity}
            >
              Nominate
            </Button>
          )}
        </ButtonContainer>
      </Content>
    </StyledCard>
  );
};
