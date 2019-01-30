import React from 'react';
import ReactDOM from 'react-dom';
import SlotMachine, { Slot } from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlotMachine />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it("Updating the state on Start button click", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.find('button').first().simulate("click");
  expect(wrapper.state().isRunning).toBe(true);
});

it("Updating the state on Stop button click", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.find('button').first().simulate("click");
  wrapper.find('button').last().simulate("click");
  expect(wrapper.state().isRunning).toBe(false);
});

it("Slot Machine should start after 5 seconds", () => {
  const wrapper = shallow(
    <Slot />);
  setTimeout(() => expect(wrapper.state().isRunning).toBe(true), 6000)
});

it("Slot Machine should stop after 10 seconds", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.find('button').first().simulate("click");
  expect(wrapper.state().isRunning).toBe(true);
  setTimeout(() => expect(wrapper.state().isRunning).toBe(false), 11000)
});

it("Prize mone should be 100$ on the same symbol in all the wheels", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.setState({
    ...wrapper.state,
    wheelValues: [1, 1, 1]
  });
  wrapper.find('button').last().simulate("click");
  expect(wrapper.state().prizeText).toBe('Congratulations !! You won 100$');
});

it("Prize mone should be 20$ on same two consecutive symbols - 1", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.setState({
    ...wrapper.state,
    wheelValues: [1, 1, 0]
  });
  wrapper.find('button').last().simulate("click");
  expect(wrapper.state().prizeText).toBe('Congratulations !! You won 20$');
});

it("Prize mone should be 20$ on same two consecutive symbols - 2", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.setState({
    ...wrapper.state,
    wheelValues: [0, 1, 1]
  });
  wrapper.find('button').last().simulate("click");
  expect(wrapper.state().prizeText).toBe('Congratulations !! You won 20$');
});

it("Prize mone should be 10$ on two identical non-consecutive symbols", () => {
  const wrapper = shallow(
    <Slot />);
  wrapper.setState({
    ...wrapper.state,
    wheelValues: [1, 0, 1]
  });
  wrapper.find('button').last().simulate("click");
  expect(wrapper.state().prizeText).toBe('Congratulations !! You won 10$');
});

