import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import MaterialAutocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  paper: {
    fontSize: "0.5rem",
  },
});

interface CountryType {
  name: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Autocomplete: FC<{}> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<CountryType[]>([]);
  const loading = open && options.length === 0;
  const classes = useStyles(props);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      );
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setOptions(
          Object.keys(countries).map(
            (key) => countries[key].item[0]
          ) as CountryType[]
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <MaterialAutocomplete
      debug={true}
      classes={classes}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Autocomplete;
