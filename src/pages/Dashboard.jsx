// ** MUI Imports
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

// ** Redux Imports
import { useSelector } from "react-redux";

// ** Styles Imports
import * as styles from "../styles-page/styles";

const AdminDashboard = () => {
  // ** Vars
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products);
  const totalProducts = products.length;
  const totalStock = products.reduce(
    (acc, item) => Number(acc) + Number(item.stockQuantity),
    0,
  );
  const lowStockCount = products.filter(
    (item) => item.stockQuantity <= 5,
  ).length;
  const mostExpensiveProduct = products.reduce(
    (prev, current) => (prev.price > current.price ? prev : current),
    {},
  );
  const cheapestProduct = products.reduce(
    (prev, current) => (prev.price < current.price ? prev : current),
    {},
  );

  const data = [
    { title: "Total Products", value: totalProducts || 0, color: "blue" },
    {
      title: "Total Stock",
      value: totalStock || 0,
      color: "purple",
    },
    { title: "Low Stock Products", value: lowStockCount || 0, color: "red" },
    {
      title: "Expensive Product",
      value: mostExpensiveProduct?.name || "N/A",
      color: "orange",
    },
    {
      title: "Cheap Product",
      value: cheapestProduct?.name || "N/A",
      color: "rosybrown",
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography fontSize={{ xs: 18 }} color="primary">
            Welcome back,{" "}
            <Typography
              component={"span"}
              fontWeight={700}
              textTransform={"capitalize"}
              fontSize={{ xs: 19, md: 22 }}
            >
              {user.username}
            </Typography>{" "}
            👋🏻
          </Typography>
        </Grid>

        {/* Dashboard Cards */}
        {data?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card sx={styles.card(item.color)}>
              <CardContent>
                <Typography variant="h5" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="h6" fontWeight={400}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
