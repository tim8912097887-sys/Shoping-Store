import { render,screen } from "@testing-library/react";

it('test 1', () => {
  render(<div data-testid="test">Hello</div>);
});

it('test 2', () => {
  // If auto-cleanup is working, this should be null.
  // If it's NOT working, this will find the div from 'test 1'.
  const element = screen.queryByTestId('test');
  console.log(element); 
});
