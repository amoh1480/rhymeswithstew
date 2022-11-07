// get relevant dom elements
const queryInputElem = document.getElementById("query");

const frigginForm = document.getElementById("vestigial");

frigginForm.addEventListener("submit", (event) => {
  console.log("submitting");
  event.preventDefault();
});

const results = document.getElementById("results");

// add event listener to know when to search

queryInputElem.addEventListener("keyup", async function (ev) {
  ev.preventDefault();
  if (ev.key == "Enter") {
    console.log("pressed enter");

    // get the query
    const rhymeResultsResp = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`
    );
    // console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();

    console.log(rhymeResults);

    // clear out any the results
    results.innerHTML = "";

    // add new results
    for (let i = 0; i < 10; i++) {
      let rhyme = rhymeResults[i];
      // console.log(rhyme.score);
      const newResult = document.createElement("dl");
      // newResult.style.fontSize = "1px";
      newResult.style.fontSize = `${rhyme.score / 5 + 5}px`;
      // console.log(newResult);

      // definition
      const wordInfo = await fetch(
        `https://rhymebrain.com/talk?function=getWordInfo&word=${rhyme.word}`
      );

    console.log('do we even get here');
    console.log('');
    const htmlstuff = `<dt>word: ${wordInfo.word}</dt>
                       <dd>pronounciation: ${wordInfo.pron}</dd>
                       <dd>ipa: ${wordInfo.ipa}</dd>
                       <dd>freq: ${wordInfo.freq}</dd>
                       <dd>flags: ${wordInfo.flags}</dd>`;
    //   console.log(def);

      newResult.innerHTML = htmlstuff + "\n";
    //   newResult.innerHTML = htmlstuff + rhyme.word + " ";
      results.appendChild(newResult);
    }
  }
});

// write function that searches the rhyme API given a (string) query (likely you should use the fetch API)

// write function that:
//  1. expects array of word object results
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page
