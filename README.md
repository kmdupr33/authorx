authorx is a tool-chain for creating markdown-like languages.

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


