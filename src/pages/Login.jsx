// ** React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Constant Imports
import { strings } from "../constants/strings";

// ** Components Imports
import BackGroundImage from "../components/BackgroundImage";

// ** MUI Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Third Party Imports
import { useForm, Controller } from "react-hook-form";

// ** Redux Imports
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";

// ** Style Imports
import * as styles from "../styles-page/login";

const defaultValues = {
  username: "",
  password: "",
  role: "",
};

const Login = () => {
  // ** State
  const [showPassword, setShowPassword] = useState(false);

  // ** Vars
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isTabletView = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isSmallTabletView = useMediaQuery("(max-width:600px)");
  const isMobileView = useMediaQuery("(max-width:440px)");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  // ** Error message
  const errorMessage = (error) => {
    return <FormHelperText sx={styles.errorMessage}>{error}</FormHelperText>;
  };

  // ** Submit function
  const onSubmit = async (data) => {
    const result = await dispatch(login(data)).unwrap(); // ** `unwrap()` gets returned state
    if (result.isAuthenticated) {
      navigate(result.user.role === "admin" ? "/" : "/products");
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        margin={"auto"}
        width={isMobileView ? "95%" : isSmallTabletView ? "75%" : "100%"}
      >
        <Card sx={styles.loginCard(isTabletView)}>
          <CardContent sx={styles.cardContentTheme(isTabletView)}>
            <Box sx={styles.cardBox}>
              <Typography
                variant={isTabletView ? "h6" : "h5"}
                sx={styles.boxTypography}
              >
                {strings.loginTitle}
              </Typography>
            </Box>

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={styles.formMargin}>
                <Controller
                  name={"username"}
                  control={control}
                  rules={{
                    required: strings.userNameRequiredMsg,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      size={isTabletView ? "small" : "medium"}
                      value={value}
                      label={strings.userNameLabel}
                      autoComplete="off"
                      onChange={(e) => {
                        onChange(e);
                      }}
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 50))
                      }
                      placeholder={strings.userNamePlaceholder}
                      error={Boolean(errors.username)}
                    />
                  )}
                />
                {errorMessage(errors.username?.message)}
              </FormControl>

              <FormControl fullWidth sx={styles.formMargin}>
                <InputLabel
                  size={isTabletView ? "small" : "medium"}
                  error={Boolean(errors.password)}
                  sx={styles.errorColor}
                >
                  {strings.passwordLabel}
                </InputLabel>
                <Controller
                  name={"password"}
                  control={control}
                  rules={{
                    required: strings.passwordRequiredMsg,
                    minLength: {
                      value: 6,
                      message: strings.passwordMinRequiredMsg,
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      size={isTabletView ? "small" : "medium"}
                      onWheel={(e) => e.target.blur()}
                      value={value}
                      label={strings.passwordLabel}
                      autoComplete="off"
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 50))
                      }
                      onChange={(e) => {
                        onChange(e.target.value.trim());
                      }}
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon
                              icon={
                                showPassword
                                  ? "mdi:eye-outline"
                                  : "mdi:eye-off-outline"
                              }
                              fontSize={20}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errorMessage(errors.password?.message)}
              </FormControl>

              <FormControl fullWidth sx={styles.formMargin}>
                <InputLabel
                  size={isTabletView ? "small" : "medium"}
                  error={Boolean(errors.role)}
                >
                  {strings.roleLabel}
                </InputLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: strings.roleReqMsg }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label={strings.roleLabel}
                      variant="outlined"
                      error={Boolean(errors.role)}
                      size={isTabletView ? "small" : "medium"}
                    >
                      <MenuItem value="admin">{strings.adminLabel}</MenuItem>
                      <MenuItem value="user">{strings.userLabel}</MenuItem>
                    </Select>
                  )}
                />
                {errorMessage(errors.role?.message)}
              </FormControl>

              <Button
                fullWidth
                size={isTabletView ? "medium" : "large"}
                type="submit"
                variant="contained"
                sx={styles.login(isTabletView)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={25} color="inherit" />
                ) : (
                  strings.submit
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <BackGroundImage />
      </Box>
    </>
  );
};

export default Login;
