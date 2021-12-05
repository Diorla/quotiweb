import styled from "@emotion/styled";
import { Grid, SxProps, TextField, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import PriorityPicker from "components/PriorityPicker";
import { useUser } from "context/userContext";
import Category from "interfaces/Category";
import { useState } from "react";
import generateColor from "scripts/generateColor";
import createCategory from "../../services/createCategory";
import FormWrapper from "../../components/FormWrapper";
import FormButton from "../../components/FormButton";
import { v4 } from "uuid";

const InputColor = styled.input`
  border: none;
  padding: 0;
`;

export default function CategoryForm({ closeForm }: { closeForm: () => void }) {
  const {
    user: { uid },
  } = useUser();
  const styles: SxProps = {
    h1: {
      textAlign: "center",
    },
    grid: {
      flexDirection: "column",
      display: "flex",
    },
  };

  const submit = () => {
    if (category.name) createCategory(uid, category, closeForm);
    else setError("Please provide a name");
  };

  const [error, setError] = useState("");
  const [category, setCategory] = useState<Category>({
    id: v4(),
    name: "",
    description: "",
    priority: 0,
    color: generateColor(),
    icon: "",
    created: "",
    notes: [],
    attachments: [],
    slug: "",
  });
  return (
    <ClickAwayListener onClickAway={closeForm}>
      <FormWrapper elevation={1}>
        <Typography variant="h4" sx={styles.h1}>
          New Category
        </Typography>
        <Grid sx={styles.grid}>
          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={category.name}
            onChange={(e) =>
              setCategory({
                ...category,
                name: e.target.value,
              })
            }
          />
          <Typography color="error" variant="subtitle2">
            {error}
          </Typography>
          <TextField
            id="description"
            label="Description"
            variant="standard"
            multiline
            rows={2}
            value={category.description}
            onChange={(e) =>
              setCategory({
                ...category,
                description: e.target.value,
              })
            }
          />
          <Grid
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PriorityPicker
              value={category.priority}
              onChange={(priority) =>
                setCategory({
                  ...category,
                  priority,
                })
              }
            />
            <InputColor
              id="color"
              onChange={(e) =>
                setCategory({
                  ...category,
                  color: e.target.value,
                })
              }
              value={category.color}
              type="color"
            />
          </Grid>
          <FormButton cancel={closeForm} accept={submit} />
        </Grid>
      </FormWrapper>
    </ClickAwayListener>
  );
}
