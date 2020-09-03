authorx is a tool-chain for creating markdown-like languages.

# Table of Contents 

* [Why?](#why) 
* [How?](#how) 
* [Quickstart](#quick-start) 
* [Status & Roadmap](#project-status--roadmap) 


# Why? 

While its nice to write simple documents in markdown, anything relatively sophisticated (e.g., blogs, technical documentation, interactive explanations, interactive computing notebooks) requires using and/or implementing ad-hoc extensions to markdown. Implementing and using these extensions is difficult because: 

* Markdown [has an ambiguous grammar](https://roopc.net/posts/2014/markdown-cfg/) and therefore multiple implementations of parsing and rendering. 
* Not all programming languages have markdown parsers that offer extension points, and even when they do, those extension points often make it feel messier to write in markdown. 
* You can't arbitrarily nest tagged/transformed text in markdown, so it's inherently limited as a language. 


authorx makes it easy to create markdown-like languages that work for more complicated publishing formats.

# How? 

## Simple, unambiguous grammar 

There's only two syntactic elements to authorx documents: text and functions that transform text. Hello world looks like this:

```
<p {
  Hello, world!
}
```

You can see the grammar [here](./packages/compiler/lib/grammar.ne).

## Syntax is separate from semantics 

Functions in authorx have no meaning by default. This means that the above hello world example that calls the "p" function may create a simple html paragraph or it may display the text inside a div with pink background. It's your call. With authorx, semantics are added by defining the text-transformation functions in js and passing them to the compiler:

```js
import { compile } from "@authorx/compiler";

compile("path-to-ax-file", {
  "p": (string) => `<p>${string}</p>`
});
```

In fact, this markdown README file was generated from a README.ax file, where the functions look like markdown tags:

```
<# { How? }

<## { Syntax is separate from semantics } 

You can see the grammar <a(./grammar.ne) { here }.

<l {
<< { Markdown <a(https://roopc.net/posts/2014/markdown-cfg/) { has an ambiguous grammar } and therefore multiple implementations of parsing and rendering. }
<< { Not all programming languages have markdown parsers that offer extension points, and even when they do, those extension points often make it feel messier to write in markdown. }
<< { You can't arbitrarily nest tagged/transformed text in markdown, so it's inherently limited as a language. }
}
```

# Quick Start 

Here's how you could create a language that has the "#" h1 headings of markdown:

```
npm i @authorx/compiler
echo -n "<# { hello world! }" > hello.ax
echo "module.exports = { '#': (text) => '<h1>' + text + '</h1>' } " > my-markdown.js  
npx axc hello.ax my-markdown.js
# outputs <h1>hello world</h1>
```

If you don't want to rewrite markdown-esque functions, you can `npm i @authorx/x-faux-markdown` and extend those functions trivially:

```js
// my-markdown.js
const xFauxMarkdown = require("@authorx/x-faux-markdown")
module.exports = {
  // Your custom functions here
  ...xFauxMarkdown  
}
```

Then just rerun `axc` and point it to your new file:

```
npx axc hello.ax my-markdown.js
```

# Project Status & Roadmap 

authorx is in rough shape currently. The syntax isn't even as clean as I'd like it, but I'm working on [the roadmap](./Roadmap.ax). Feel free to file issues. Would love to hear your feedback.


