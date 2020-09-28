import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginTop: theme.spacing(2),
    margin: 'auto',
    borderRadius: "none",
    boxShadow: "none",
  },
  media: {
    height: 140,
  },
}));

const NotificationCard = ({ title, body, createdAt }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {body}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {dayjs().from(dayjs(createdAt))}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default NotificationCard;
