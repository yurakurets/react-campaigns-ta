import Chance from 'chance';
import dayjs from 'dayjs';

import {ICampaign} from "../components/CampaingsTable/types";

const chance = new Chance();

const generateCampaign = (): ICampaign => {
  const name = chance.sentence({words: 3});
  const startDate = dayjs(chance.date({year: 2021})).format('MM/DD/YYYY');
  const endDate = dayjs(startDate).add(chance.integer({min: 1, max: 30}), 'day')
    .format('MM/DD/YYYY');
  const budget = chance.floating({min: 0, max: 100000, fixed: 0});
  const id = chance.guid();
  return {id, name, startDate, endDate, Budget: budget};
};

export const MOCK_CAMPAIGNS = Array.from({length: 20}, generateCampaign);
