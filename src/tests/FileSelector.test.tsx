import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FileSelector from '../FileSelector';

it('parses', async () => {
  const divId = 'selectFromHere';
  const prompt = 'Choose something!';
  const f = FileSelector(prompt, divId);
  expect(typeof f).toEqual('function');
});

it('renders selection prompt', async () => {
  const div = document.createElement('div');
  const divId = 'selectFromHere';
  ReactDOM.render(<div><div id={divId} /></div>, div);

  // ReactDOM.render doesn't update document.body, so we fill the render cut point
  // with instructions to fill the top-level div element directly, rather than to
  // search the document.
  let renderedSelection = false
  function render(elt: React.ReactElement<any>, containerDivId: string) {
    renderedSelection = true;
    const containerDiv = div.querySelector(`#${containerDivId}`);
    return ReactDOM.render(elt, containerDiv);
  }

  const prompt = 'Choose something!';
  const fs = FileSelector(prompt, divId, render);
  expect(div.innerHTML).not.toContain(prompt);

  const dir = 'parentDirectory';
  const entries = ['foo', 'bar', 'baz'];
  fs(dir, entries).catch(error => {
    console.error(error);
    fail();
  });

  expect(renderedSelection).toBe(true);
  expect(div.innerHTML).toContain(prompt);
  // react-select only renders the first choice until we twiddle select.
  expect(div.innerHTML).toContain(entries[0]);

  // XXX how to touch/select?
  
  // expect(div.innerHTML).toContain(divId);
  ReactDOM.unmountComponentAtNode(div);
});

