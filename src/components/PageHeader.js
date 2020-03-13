import React from "react";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";

const Title = styled.h1`
  font-weight: 900;

  color: #076570;
  font-size: ${({ small }) => (small ? "22px" : "34px")};
  margin: 0;
`;
const Subtitle = styled.span`
  color: #aeaeae;
  font-size: ${({ small }) => (small ? "14px" : "20px")};
  font-style: italic;
`;

function PageHeader({ title, subtitle, children, small = false }) {
  return (
    <Grid container alignItems="center" justify="space-between">
      <Grid item xs={small ? null : 12} sm={small ? null : 6}>
        <Title small={small}>{title}</Title>
        <Subtitle small={small}>{subtitle}</Subtitle>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          {children && children.length ? (
            children.map((child, i) => {
              return (
                <Grid item key={"page-header-child-" + i}>
                  {child}
                </Grid>
              );
            })
          ) : (
            <Grid item>{children}</Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
