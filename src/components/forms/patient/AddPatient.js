import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import BackButton from "../../../utils/BackButton";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../../../redux/ducks/patientsDucks";

import { validRut } from "../../../utils/validateRut";

const AddPatientStyled = styled.div`
  /* Hidde spinner number input Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hidde spinner number input Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  /* ------- */
  margin-bottom: 2em;
  .form {
    margin-left: 1em;
    margin-right: 1em;
  }
  .form-button {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
  }

  .title {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddPatient({ history }) {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const newPatient = useSelector((state) => state.patients.newPatient);
  const newPatientError = useSelector((state) => state.patients.errors);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (newPatient || newPatientError) {
      setLoading(false);
    }
  }, [dispatch, newPatient, newPatientError]);

  const onSubmit = (data, e) => {
    if (!loading) {
      setLoading(true);
      dispatch(addPatient(data));
      handleOpen();
      if (newPatientError) {
        e.target.reset();
      }
    }
  };

  const handleVerifyRut = (e) => {
    if (e.target.value.length !== 0) {
      if (!validRut(e.target.value)) {
        let errorElement = document.getElementById("rut-error");
        errorElement.innerHTML =
          "<p style='color: red; font-size: 10px;'>Rut inválido</p>";
      }
    }
  };
  const clearRutError = () => {
    let errorElement = document.getElementById("rut-error");
    errorElement.innerHTML = "";
  };

  const reqmsg = "Campo obligatorio";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <AddPatientStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container alignItems="center">
          <Typography className="title" variant="h5" color="primary">
            Agregar paciente
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <BackButton his={history} />
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="rut"
                type="text"
                label="Rut (Sin puntos ni guión)"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                onBlur={handleVerifyRut}
                onFocus={clearRutError}
                error={errors.rut}
                helperText={errors.rut ? errors.rut.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
              <div id="rut-error"></div>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="names"
                type="text"
                label="Nombres"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.names}
                helperText={errors.names ? errors.names.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="father_last_name"
                type="text"
                label="Apellido paterno"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.father_last_name}
                helperText={
                  errors.father_last_name ? errors.father_last_name.message : ""
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="mother_last_name"
                type="text"
                label="Apellido materno"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.mother_last_name}
                helperText={
                  errors.mother_last_name ? errors.mother_last_name.message : ""
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="city"
                type="text"
                label="Ciudad"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.city}
                helperText={errors.city ? errors.city.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="email"
                label="Email"
                type="text"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.email}
                helperText={errors.email ? errors.email.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="phone"
                label="Teléfono"
                type="text"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="select-alimentation">
                  Tipo de alimentación
                </InputLabel>
                <Select
                  native
                  name="alimentation"
                  label="Alimentación"
                  inputRef={register}
                >
                  <option value={"Omnívoro"}>Omnívoro</option>
                  <option value={"Vegetariano"}>Vegetariano</option>
                  <option value={"Vegano"}>Vegano</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
          </Grid>

          <Grid item container spacing={isMobile ? 0 : 2}>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="birth_date"
                type="date"
                variant="outlined"
                margin="dense"
                className="input"
                fullWidth
                error={errors.birth_date}
                helperText={
                  errors.birth_date
                    ? errors.birth_date.message
                    : "Fecha de nacimiento"
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="select-sex">Sexo</InputLabel>
                <Select native name="sex" label="Sexo" inputRef={register}>
                  <option value={"Masculino"}>Masculino</option>
                  <option value={"Femenino"}>Femenino</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={false} sm={2} md={3} lg={4}></Grid>
          </Grid>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <div className={classes.wrapper}>
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              disabled={loading}
            >
              Agregar paciente
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </form>

      {newPatient ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            El paciente {newPatient.names} {newPatient.father_last_name}{" "}
            {newPatient.mother_last_name} fue agregado exitosamente!{" "}
          </Alert>
        </Snackbar>
      ) : newPatientError ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {newPatientError}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </AddPatientStyled>
  );
}
