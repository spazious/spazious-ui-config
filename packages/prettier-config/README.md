Linters have two categories of rules:

- `Formatting rules`: eg: max-len, no-mixed-spaces-and-tabs, keyword-spacing, comma-style…

Prettier alleviates the need for this whole category of rules! Prettier is going to reprint the entire program from scratch in a consistent way, so it’s not possible for the programmer to make a mistake there anymore :)

- `Code-quality rules`: eg no-unused-vars, no-extra-bind, no-implicit-globals, prefer-promise-reject-errors…

Prettier does nothing to help with those kind of rules. They are also the most important ones provided by linters as they are likely to catch real bugs with your code!

In other words, use Prettier for formatting and linters for catching bugs!

# Editorconfig

- https://github.com/editorconfig/editorconfig/issues/236#issuecomment-593352460

## Prettier config

https://prettier.io/docs/en/configuration.html#sharing-configurations

https://prettier.io/docs/en/configuration.html#editorconfig

## References

- https://prettier.io/docs/en/comparison.html
