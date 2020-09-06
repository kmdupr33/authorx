module.exports = (target = "md") => {
  const functions = {
    md: {
      "*": (text) => `*${text.trim()}*`,
      "#": (text) => `# ${text}`,
      "##": (text) => `## ${text}`,
      "###": (text) => `### ${text}`,
      l: {
        func: (text) => text,
        scope: {
          "<": {
            func: (text) => `* ${text}`,
            scope: {
              "<": { func: (text) => `  * ${text}` },
            },
          },
        },
      },
      "`": (text) => "`" + text.trim() + "`",
      "``": (text) => "``" + text.trim() + "``",
      a: (text, [url]) => `[${text.trim()}](${url.value})`,
      ">": (text) => `> ${text}`,
      "```": (text, lang) =>
        `\`\`\`${(lang && lang[0].value) || ""}${text}\`\`\``,
      // A comment function
      "//": () => "",
    },
    html: {
      "*": (text) => `<em>${text.trim()}</em>`,
      "#": (text) => `<h1>${text}</h1>`,
      "##": (text) => `<h2>${text}</h2>`,
      "<": (text) => `<li>${text}</li>`,
      "`": (text) => "<code>" + text.trim() + "</code>",
      a: (text, [url]) => `<a href="${url.value}">${text.trim()}</a>`,
      "```": (text, lang) =>
        `<pre><code class="${
          (lang && lang[0].value) || ""
        }">${text}</code></pre>`,
      // A comment function
      "//": () => "",
    },
  };
  return functions[target];
};
