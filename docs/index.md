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
  <p style="margin-left: 5px">authorx is pre 1.0 and it's syntax and API may change before 1.0. You can view the roadmap <a href="#project-status--roadmap">here</a>.
</p>
</div>



# Table of Contents

* [Why?](#why) 
* [How?](#how) 
* [Quickstart](#quick-start) 
* [Authorx Syntax](#authorx-syntax) 
* [Extensions Reference](#extensions-reference) 
  * [x-faux-markdown](#x-faux-markdown) 
  * [x-info-panel](#x-info-panels) 
  * [x-mermaid-js](#x-mermaid-js) 

* [Status & Roadmap](#project-status--roadmap) 
* [FAQs/Gotchas](#faqs) 


# Why?

While its nice to write simple documents in markdown, writing anything relatively sophisticated (e.g., blogs, technical documentation, interactive content) is a pain. 

For example, consider the red warning panel at the top of this doc that says authorx is pre-1.0. The only way to create something like that in markdown is to embed html into your markdown doc:

```md

<div <!-- ... --> >
  <div>
    <svg
      <!-- ... -->
    >
      <path <!-- ... --> />
    </svg>
  </div>
  <p <!-- ... --> >I don't recommend using authorx for serious projects yet.
  You can view the roadmap to 1.0 <a href="#project-status--roadmap">here</a>.
  </p>
</div>

# Table of Contents

```

With authorx, you *could* create a warning info panel like this:

```
<! {
  I don't recommend using authorx for serious projects yet.
  You can view the roadmap to 1.0 <a(#project-status--roadmap) { here }.
}
```

Note that with authorx we can arbitrarily nest transformed content. Here we have a link inside of a warning panel.

Here's another example: say you wanted to embed a [mermaid.js](https://mermaid-js.github.io/mermaid/#/) diagram into your doc like [the one below](#syntax-is-separate-from-semantics). If you're just using markdown, you'll have to write your mermaid diagram, run the cli, and then include a reference to the generated image in your markdown. With authorx, you can embed mermaid diagrams like this:

```
<~ {:
  graph LR
  A[.ax file] -->|parse| B(AST)
  B --> C("authorx-extensions e.g., x-faux-markdown x-mermaid-js")
  C -->D(your extensions)
  D -->E(".html | .md | .*")
:}
```

I've been emphasizing *could* in these examples because the way authorx documents work is largely up to you. With authorx, syntax and semantics are separate. The `<~` in the above example is just a function. You define what the function does in javascript. Maybe it embeds a mermaid diagram into your document. Maybe it floats content to the left side of the page. It's up to you. 

With authorx's minimal and expressive syntax and your function definitions, you can create markdown-like languages that work for more rich and interactive content. All you have to do is define the functions.

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

Here's the high-level flow of how `compile` transforms text to its final format:

![](/diagram.svg)

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
module.exports = () => ({ 
  '#': (text) => '<h1>' + text + '</h1>' 
})  
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

# Authorx Syntax

Authorx only has two syntactic elements: functions and text. Authorx docs must start with a function invocation. That function may be a no-op, but the current syntax requires it. (This should go away eventually.) Typically, authorx docs start with a no-op function and nest content inside of it like this:

```
<$ {
  <# Now that i've started the document with a function, the parser is happy.
  
  All of my content goes <* { here }.
}
```

Text is written exactly how you'd expect: you just write words into your authorx file (by convention, saved with .ax extension).

Functions transform text and/or execute side-effects. They can wrap text in h1 tags, place text inside a warning panel div, or build a mermaid diagram and replace the text with a reference to the generated svg. Functions start with a `<` and must be followed by an identifer. Here are some examples:

```
<h1 { wrap me in a heading! }  
<# { wrap me in a heading too !}
```

Notice that function identifers can contain special characters. This enables you to keep them short and your keep your authorx docs focused on the text. Here's the full list of supported special characters in identifiers:

* &
* *
* %
* $
* @
* !
* -
* +
* _
* ~
* `
* <


Functions that operate on multiple lines of text should surround that text with brackets like the above example. If, however, your function only operates on one line of text, you may omit the brackets like so:

```
<# Wrap me in a heading!
```

Whether your function operates on text surrounded by brackets or operates on single line text, the `<`, `{`, `}`, and `\` characters must be escaped with a `\`.

To facilitate the inclusion of code in authorx docs without needing to escape characters, you can also wrap text in colon brackets "{:" ":}". Inside colon brackets, "<," "{,", and "}" don't need to be escaped with "\\".

Functions can also take arguments. For example, a link function may take the url of the link:

```
You can find my blog <a(http://philosophicalhacker.com) { here }
```

Multiple function arguments must be separated by a comma.

# Extensions Reference

authorx has some first-party extensions for common use-cases. the functions exposed by those extensions are documented below.

## x-faux-markdown

### Headings

`#` wraps text in a h1 tag

`##` wraps text in a h2 tag

`##` wraps text in a h3 tag

### Lists

`l` creates an unordered list. Items are added to list using the `<` function. Example:

```
<l {
  << item1
  << item2
}
```

### Code

`` ` `` creates inline monospaced code

```` ``` ```` creates a code block and takes an optional language argument. Example:

```
<```(js) {:
  console.log("hello world!)
:}
```

### Links

`a` creates a link and takes an url argument. Example:

```
You can find my blog <a(http://philosophicalhacker.com) { here }
```

## x-info-panel

`!` creates an warning panel like the one at the top of this doc. 

## x-mermaid-js

`~` generates an svg mermaid diagram using the text within its brackets. It then replaces the mermaid text with a link to that diagram. It optionally takes an argument specifying the name of generated svg file. Example:

```
<~(my-diagram.svg) {:
  graph LR
  A -->|parse| B
:}
```

# Project Status & Roadmap 

Here's a roadmap for upcoming features:

* Add Macro Support 
* Add x-toc (table of contents generation)
* implement html target for x-faux-markdown
* x-front-matter
* x-hugo (shortcodes)
* better parser error messages?
* Buffer tweets example semantics?
* Slack onboarding example semantics?
* reveal.js presentation example semantics?


If you're using authorx, feel free to file issues. Would love to hear your feedback. If you have an idea for an extension, please file an issue so we can discuss it.

# FAQs

> I'm getting a syntax error about a newline that I didn't add to my authorx doc. What gives?

The current grammar doesn't like trailing newlines in authorx docs. This should go away soon, but until you need to watch out for editors that automatically add a newline at the end of file. vim is an offender here.


