import { Grid } from "@mui/material";

interface Props {}

export const DeleteEvent : React.FC<Props> = () => {
    return (
        <Grid>
            <h1>Are you sure you want to delete this event?</h1>
        </Grid>
    );
}