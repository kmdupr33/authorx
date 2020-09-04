const xFauxMarkdown = require("@authorx/x-faux-markdown");

module.exports = () => {
  return {
    "!": {
      func: (text) => `
<div style="background-color: rgb(255, 235, 230);">
    <p>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(222, 53, 11)" width="18px" height="18px">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"/>
            </svg> 
        </span> ${text}
    </p>
</div>`,
      scope: xFauxMarkdown("html"),
    },
  };
};
