import React, { FC } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MaterialRadioGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type RadioGroupProps = {};

// TODO: DRY 0.8rem
const useFormLabelStyles = makeStyles({});

const useFormControlLabelStyles = makeStyles({});

// TODO: Make more dynamic
// TODO: Sync up color scheme for all inputs
const RadioGroup: FC<RadioGroupProps> = (props) => {
  const [value, setValue] = React.useState("all");
  const formLabelClasses = useFormLabelStyles(props);
  const formControlLabelClasses = useFormControlLabelStyles(props);
  return (
    <FormControl component="fieldset">
      <FormLabel classes={formLabelClasses} component="legend">
        Type
      </FormLabel>
      <MaterialRadioGroup
        aria-label="movie-type"
        name="movie-type-1"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue((e.target as HTMLInputElement).value)
        }
        row
      >
        <FormControlLabel
          classes={formControlLabelClasses}
          value="all"
          control={<Radio size="small" />}
          label="All"
        />
        <FormControlLabel
          classes={formControlLabelClasses}
          value="movie"
          control={<Radio size="small" />}
          label="Movie"
        />
        <FormControlLabel
          classes={formControlLabelClasses}
          value="series"
          control={<Radio size="small" />}
          label="Series"
        />
      </MaterialRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
