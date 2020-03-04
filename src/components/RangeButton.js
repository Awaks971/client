import React, { useState, useEffect } from "react";

import ButtonMenu from "./ButtonMenu";
import KeyboardArrowIcon from "@material-ui/icons/KeyboardArrowDown";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  DateRangePicker,
  DefinedRange,
  createStaticRanges
} from "react-date-range";
import { Grid, Button } from "@material-ui/core";
import moment from "moment";

import { fr } from "react-date-range/dist/locale";

function RangeButton({ getRange, getDaysBetween }) {
  const pastWeek = new Date(
    moment()
      .startOf("week")
      .toISOString()
  );

  const [range, setCurrentRange] = useState({
    startDate: pastWeek,
    endDate: new Date().toUTCString(),
    key: "selection",
    color: "#ff6f00"
  });

  const startDate = new Date(range.startDate).toLocaleDateString();
  const endDate = new Date(range.endDate).toLocaleDateString();

  function handleSelect({ selection }) {
    setCurrentRange({ ...selection });
    getDaysBetween &&
      getDaysBetween(daysBetween(range.startDate, range.endDate));
  }

  function treatAsUTC(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }

  function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
  }

  useEffect(() => {
    getRange && getRange({ ...range });
  }, []);

  return (
    <ButtonMenu
      color="secondary"
      size="small"
      label={startDate === endDate ? startDate : `${startDate} - ${endDate}`}
      icon={<KeyboardArrowIcon />}
    >
      {({ onClose }) => (
        <div>
          <DateRangePicker
            color="#000"
            locale={fr}
            maxDate={new Date()}
            showDateDisplay={false}
            ranges={[range]}
            onChange={handleSelect}
            inputRanges={[]}
            staticRanges={createCustomStaticRanges()}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item>
                  <Button size="small" color="default">
                    Annuler
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      getRange && getRange({ ...range });

                      onClose();
                    }}
                    size="small"
                    color="primary"
                  >
                    Appliquer
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </ButtonMenu>
  );
}

function createCustomStaticRanges() {
  const startOfWeek = moment()
    .startOf("week")
    .add(1, "d");
  const endOfWeek = moment()
    .endOf("week")
    .add(1, "d");

  const startOfMonth = moment().startOf("month");
  const endOfMonth = moment().endOf("month");

  const defineds = {
    startOfWeek: new Date(startOfWeek.toISOString()),
    endOfWeek: new Date(endOfWeek.toISOString()),

    startOfLastWeek: new Date(startOfWeek.subtract(7, "d").toISOString()),
    endOfLastWeek: new Date(endOfWeek.subtract(7, "d").toISOString()),

    startOfToday: new Date(
      moment()
        .startOf("day")
        .toISOString()
    ),
    endOfToday: new Date(
      moment()
        .endOf("day")
        .toISOString()
    ),

    startOfYesterday: new Date(
      moment()
        .subtract(1, "d")
        .toISOString()
    ),
    endOfYesterday: new Date(
      moment()
        .subtract(1, "d")
        .toISOString()
    ),

    startOfMonth: new Date(startOfMonth.toISOString()),
    endOfMonth: new Date(endOfMonth.toISOString()),

    startOfLastMonth: new Date(
      startOfMonth.subtract(1, "months").toISOString()
    ),
    endOfLastMonth: new Date(endOfMonth.subtract(1, "months").toISOString())
  };

  return createStaticRanges([
    {
      label: "Aujourd'hui",
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday
      })
    },
    {
      label: "Hier",
      range: () => ({
        startDate: defineds.startOfYesterday,
        endDate: defineds.endOfYesterday
      })
    },

    {
      label: "Cette semaine",
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek
      })
    },
    {
      label: "Semaine dernière",
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek
      })
    },
    {
      label: "Ce mois-ci",
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth
      })
    },
    {
      label: "Mois dernier",
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth
      })
    }
  ]);
}

export default RangeButton;
