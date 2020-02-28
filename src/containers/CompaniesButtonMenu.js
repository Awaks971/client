import React from "react";
import ButtonMenu from "../components/ButtonMenu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowIcon from "@material-ui/icons/KeyboardArrowDown";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { CURRENT_USER } from "../apollo/localManagement";

import { useHistory } from "react-router-dom";
import { CURRENT_LOGGED_USER } from "../apollo/user/queries";
import { SWITCH_COMPANY } from "../apollo/user/mutations";

const useStyles = makeStyles(theme => ({
  activeMenuItem: {
    fontWeight: 900,
    color: theme.palette.secondary.main,
    backgroundColor: "#25283D14"
  }
}));

function CompaniesButtonMenu({ currentLoggedCompany }) {
  const classes = useStyles();
  const { data } = useQuery(CURRENT_LOGGED_USER);

  const history = useHistory();

  const [switchCompany] = useMutation(SWITCH_COMPANY, {
    onCompleted({ switch_company }) {
      currentLoggedCompany && currentLoggedCompany(switch_company);
    },
    update(proxy, { data: { switch_company } }) {
      proxy.silenceBroadcast = true;
      proxy.writeQuery({
        query: CURRENT_USER,
        data: { auth: { ...switch_company } }
      });

      history.replace("/dashboard");
    }
  });

  return (
    <ButtonMenu
      buttonStyles={{ color: "#fff", borderColor: "#fff" }}
      icon={<KeyboardArrowIcon />}
      size="small"
      label={
        data &&
        data.auth.userCompanies.find(
          company => company.id === data.auth.loggedAs.id
        ).name
      }
    >
      {({ onClose }) => (
        <div>
          {data &&
            data.auth.userCompanies.map(({ id, name }) => {
              return (
                <MenuItem
                  classes={{
                    root: data.auth.loggedAs.id === id && classes.activeMenuItem
                  }}
                  onClick={() => {
                    switchCompany({ variables: { companyId: id } });
                    onClose();
                  }}
                  key={id}
                >
                  {name}
                </MenuItem>
              );
            })}
        </div>
      )}
    </ButtonMenu>
  );
}

export default CompaniesButtonMenu;
