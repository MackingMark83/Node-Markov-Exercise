const { MarkovMachine } = require("./markov");


describe('markov machine', function () {
  test('makes chains', function () {
    let mm = new MarkovMachine("ee ff gg ee FF ee FF");

    expect(mm.chains).toEqual(new Map([
      ["ee", ["ff", "FF", "FF"]],
      ["ff", ["gg"]],
      ["gg", ["ee"]],
      ["FF", ["ee", null]]]));
  });

  

  test('generates semi-predictable text', function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(["a b c", "b c", "c"]).toContain(text);
  });

  test('generates valid text', function () {
    let bigrams = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText();
    expect(output.endsWith('hat')).toBe(true);

    let outputWords = mm.makeText().split(/[ \r\n]+/);

    for (let i = 0; i < outputWords.length - 1; i++) {
      expect(bigrams).toContain(outputWords[i] + " " + outputWords[i + 1]);
    }
  });

 
});
