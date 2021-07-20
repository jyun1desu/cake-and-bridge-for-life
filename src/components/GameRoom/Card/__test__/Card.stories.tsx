import { Story, Meta } from "@storybook/react";
import { RecoilRoot } from 'recoil';
import CardComponent, { CardProperty } from '../index';
import { CardSuitType } from 'types/card';

export default {
  title: 'GameRoom/Card',
  component: CardComponent,
  argTypes: {
    hasDetail: {
      control: { type: "boolean" },
    },
    nowPickSuit: {
      control: {
        type: "radio",
        options: [null, CardSuitType.Spade, CardSuitType.Heart, CardSuitType.Diamond, CardSuitType.Club]
      },
    },
    suit: {
      control: {
        type: "radio",
        options: [CardSuitType.Spade, CardSuitType.Heart, CardSuitType.Diamond, CardSuitType.Club]
      },
    },
    number: {
      control: {
        type: "select",
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
      },
    },
  },
} as Meta;

const Template: Story<CardProperty> = (args) => (
  <RecoilRoot>
    <CardComponent {...args} />
  </RecoilRoot>
);

export const Normal = Template.bind({});
Normal.args = {
  number: 10,
  suit: CardSuitType.Heart,
  hasDetail: true,
  className: 'group'
};

export const NoDetail = Template.bind({});
NoDetail.args = {
  number: 0,
  suit: CardSuitType.Heart,
  hasDetail: false,
  className: 'group'
};