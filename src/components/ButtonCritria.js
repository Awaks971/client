import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowIcon from "@material-ui/icons/KeyboardArrowDown";
import React, { useEffect } from "react";
import ButtonMenu from "../components/ButtonMenu";

function ButtonCriteria({ criterion }) {
  const criteria = [
    { name: "amount_ttc", label: "Montant TTC" },
    { name: "profit", label: "Marge" },
    { name: "article_count", label: "Quantité" }
  ];
  const [current_criterion, set_current_criterion] = React.useState({
    name: "amount_ttc",
    label: "Montant TTC"
  });

  useEffect(() => {
    criterion && criterion(current_criterion);
  }, [criterion, current_criterion]);

  return (
    <ButtonMenu
      color="secondary"
      icon={<KeyboardArrowIcon />}
      size="small"
      label={current_criterion.label}
    >
      {({ onClose }) => {
        return criteria.map((criterion, i) => (
          <MenuItem
            key={criterion.name}
            selected={criterion.name === current_criterion.name}
            onClick={() => {
              set_current_criterion(criterion);
              onClose();
            }}
            value={criterion.name}
          >
            {criterion.label}
          </MenuItem>
        ));
      }}
    </ButtonMenu>
  );
}

export default ButtonCriteria;
