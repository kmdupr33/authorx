<div
  style="
    background-color: rgb(255, 235, 230);
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  "
>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="rgb(222, 53, 11)"
      width="26px"
      height="26px"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
      />
    </svg>
  </div>
  <p style="margin-left: 5px">I don't recommend using authorx for serious projects yet.
  You can view the roadmap to 1.0 <a href="#project-status--roadmap">here</a>.
</p>
</div>


# Table of Contents

* [Why?](#why) 
* [How?](#how) 
* [Quickstart](#quick-start) 
* [Status & Roadmap](#project-status--roadmap) 


# Why?

While its nice to write simple documents in markdown, writing anything relatively sophisticated (e.g., blogs, technical documentation, interactive content) is a pain because: 

* We often need to use awkward, ad-hoc extensions to markdown. Take "front-matter" in static site generators, for example.
* There are some things we just can't do with markdown because it doesn't allow arbitrary nesting of tagged/transformed text. We wind up embedding markdown in html or in some sort of template system.


Let's quickly walk through how authorx solves these problems. 

Let's start with front matter as an example. You'll often find markdown documents with front matter that look like this:

```md
+++
title = "Why authorx?"
tags = [
  "technical", 
  "philosophical"
]
+++

# But y tho?

Compelling explanation with **bold claims**.
```

Markdown isn't expressive enough to represent the document metadata, so we're stuck tacking toml or yaml at the top of our markdown files. In authorx, the same document *could* look like this:

```ax
<$ {
  <+ {
    <=(title) Why authorx?
    <=(tags) {
      << technical
      << philosophical
    }
  }

  <# But y tho?

  Compelling explanation with <* { bold claims }.
}
```

With authorx, we don't need an ad-hoc extension to the language, the syntax for describing your metadata and for marking up text is the same.

Let's look at the problem of arbitrarily nesting transformed content. Say I want to a footnote to appear in the margin [a-la-Tufte](https://rstudio.github.io/tufte/). With markdown, I have to start using html:

```md

Claim.<sup>1</sup>

<footnote class="margin">
1. Evidence from some pages from some book by some author
</footnote>

```

This is bad enough as is, but it's worse because I can't use any markdown inside of the html tags. What if I want to bold something in the footnote? With authorx, the same document *could* look like this:

```ax
  <$ {
    Claim. <footn {
      <* { Bold } Evidence from some pages from some book by some author
    }
  }
```

I've been emphasizing *could* in these examples because the way authorx documents work is largely up to you. With authorx, syntax and semantics are separate. The `<footn` in the above example is just a function. You define what the function does in javascript. Maybe it puts the footnote to the margin in a Tufte style. Maybe it puts the footnote at the end of the document. 

With authorx's minimal and expressive syntax and your function definitions, you can create markdown-like languages that work for more complicated publishing formats. All you have to do is define the functions.

# How?

## Simple grammar

There's only two syntactic elements to authorx documents: text and functions that transform text. Hello world looks like this:

```
<p Hello, world!
```

You can see the grammar [here](https://github.com/kmdupr33/authorx/blob/master/packages/compiler/lib/grammar.ne).

## Syntax is separate from semantics 

Functions in authorx have no meaning by default. With authorx, semantics are added by defining the text-transformation functions in js and passing them to the compiler:

```js
import { compile } from "@authorx/compiler";

compile("path-to-ax-file", {
  "#": (text) => `<h1>${text}</h1>`
});
```

In fact, this markdown README file was generated from [a README.ax file](./README.ax), where the functions look like markdown tags:

```
<# How?

<## Syntax is separate from semantics  

You can see the grammar <a(./grammar.ne) { here }.

<l {
<< We often need to use awkward, ad-hoc extensions to markdown. Take "front-matter" in static site generators, for example.
<< There are some things we just can't do with markdown because it doesn't allow arbitrary nesting of tagged/transformed text. We wind up embedding markdown in html or in some sort of template system.
}
```

The markdown-like functions that generated this readme are defined in the [x-faux-markdown package](https://github.com/kmdupr33/authorx/tree/master/packages/x-faux-markdown)

# Quick Start 

```
npm i @authorx/compiler
```

Let's write hello world in a `hello.ax` file:

```
<# hello world
```

Next, we'll create an empty `my-markdown.js` file, with details to be filled in later:

```bash
touch my-markdown.js
```

You can use the compiler right away, but all it'll do is print out hello world:

```bash
npx axc hello.ax my-markdown.js
# outputs "hello world"
```

If you want "<#" to wrap "hello world" in h1 headings like markdown does, add this to your `my-markdown.js` file

```js
module.exports = { 
  '#': (text) => '<h1>' + text + '</h1>' 
}  
```

Now, when you run `axc`, you'll see that hello world is wrapped in h1 tags:

```bash
npx axc hello.ax my-markdown.js
# outputs <h1>hello world</h1>
```

If you don't want to rewrite markdown-esque functions, you can `npm i @authorx/x-faux-markdown` and extend those functions trivially:

```js
// my-markdown.js
const xFauxMarkdown = require("@authorx/x-faux-markdown")
module.exports = {
  // Your custom functions here
  ...xFauxMarkdown()  
}
```

Then just rerun `axc` and point it to your updated file:

```bash
npx axc hello.ax my-markdown.js
```

# Project Status & Roadmap 

authorx is in rough shape currently. The syntax isn't even as clean as I'd like it, but I'm working on [the roadmap](https://github.com/kmdupr33/authorx/blob/master/Roadmap.ax). Feel free to file issues. Would love to hear your feedback.


