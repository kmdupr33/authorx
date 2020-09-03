module.exports = {
  "*": (string) => `*${string}*`,
  "#": (string) => `# ${string}`,
  "##": (string) => `## ${string}`,
  "<": (string) => `* ${string}`,
  "`": (string) => "`" + string.trim() + "`",
  a: (string, [url]) => `[${string.trim()}](${url.value})`,
  ">": (string, lang) =>
    `\`\`\`${(lang && lang[0].value) || ""}${string}\`\`\``,
  // A comment function
  "//": () => "",
};
