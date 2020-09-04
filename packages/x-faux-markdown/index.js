module.exports = (target = "md") => {
  const functions = {
    md: {
      "*": (string) => `*${string.trim()}*`,
      "#": (string) => `# ${string}`,
      "##": (string) => `## ${string}`,
      "<": (string) => `* ${string}`,
      "`": (string) => "`" + string.trim() + "`",
      a: (string, [url]) => `[${string.trim()}](${url.value})`,
      ">": (string, lang) =>
        `\`\`\`${(lang && lang[0].value) || ""}${string}\`\`\``,
      // A comment function
      "//": () => "",
    },
    html: {
      "*": (string) => `<em>string.trim()}</em>`,
      "#": (string) => `<h1>${string}</h1>`,
      "##": (string) => `<h2>${string}</h2>`,
      "<": (string) => `<li>${string}</li>`,
      "`": (string) => "<code>" + string.trim() + "</code>",
      a: (string, [url]) => `<a href="${url.value}">${string.trim()}</a>`,
      ">": (string, lang) =>
        `<pre><code class="${
          (lang && lang[0].value) || ""
        }">${string}</code></pre>`,
      // A comment function
      "//": () => "",
    },
  };
  return functions[target];
};
