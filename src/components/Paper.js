import React from "react";
import styled from "styled-components";
import MUIPaper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const CustomPaper = styled(
  ({ paperRef, spaced, bodyLoading, titleLoading, outlined, ...rest }) => (
    <MUIPaper ref={paperRef} outlined={outlined} {...rest} />
  )
)`
  && {
    min-height: 100px;
    display: block;
  }
`;

const PaperTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #07657024;
  padding: 12px 24px;
`;
const PaperTitle = styled.h2`
  color: #076570;
  font-size: 16px;
  width: 70%;

  margin: 0;
`;
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ spaced }) => (spaced ? "12px 24px" : "0")};
  overflow: scroll;
`;

function Paper({
  title,
  paperRef,
  children,
  bodyLoading,
  spaced,
  actions,
  titleLoading,
  ...rest
}) {
  return (
    <CustomPaper outlined={rest.outlined} paperRef={paperRef} {...rest}>
      {title && (
        <PaperTitleWrapper>
          <PaperTitle>{title}</PaperTitle>
          {titleLoading && <CircularProgress fontSize="20px" />}
          {actions && actions}
        </PaperTitleWrapper>
      )}
      <ContentContainer spaced={spaced}>
        {bodyLoading ? (
          <CircularProgress />
        ) : (
          <Grid container>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        )}
      </ContentContainer>
    </CustomPaper>
  );
}

export default Paper;
