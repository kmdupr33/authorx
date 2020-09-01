module.exports = {
  "*": (string) => `*${string}*`,
  "#": (string) => `# ${string}`,
  "##": (string) => `## ${string}`,
  "<": (string) => `* ${string}`,
  a: (string, [url]) => `[${string.trim()}](${url.value})`,
  ">": (string, lang) =>
    `\`\`\`${(lang && lang[0].value) || ""}\n${string}\`\`\``,
};
