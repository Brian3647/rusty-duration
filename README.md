<div align="center">

# rusty-duration

[![npm](https://img.shields.io/npm/v/rusty-duration)](https://www.npmjs.com/package/rusty-duration)
![License](https://img.shields.io/github/license/Brian3647/rusty-duration)
![GitHub issues](https://img.shields.io/github/issues/Brian3647/rusty-duration)
![Build status](https://img.shields.io/github/actions/workflow/status/Brian3647/rusty-duration/bun.yml)

A rust-inspired library for working with durations in javascript/typescript.

</div>

## Installation

You can use your favorite package manager to install rusty-duration via npmjs.org packages. For example:

```bash
$ npm install rusty-duration
```

## Usage

The library exports a single class, `Duration`, which can be used to represent a duration of time and a number of constants that can be used to convert between different units of time.

Since the methods are the same as in the rust standard library, you can refer to the [rust documentation](https://doc.rust-lang.org/std/time/struct.Duration.html) for information on how to use the class. Some methods might not be implemented (see [Usage notes](#usage-notes)).

### Usage notes

1. In opposition to the rust standard library, the `Duration` class methods are in `camelCase`, following the javascript convention.
2. Due to the lack of error handling in typescript, methods like `Duration::checked_*` and `Duration::saturating_*` are not implemented. Instead, you do can use `try` and `catch` blocks and constants like `Duration.MAX`, `Duration.MIN` or `DuratION.ZERO` to achieve the same effect.
3. Most methods assume that both `seconds` and `nanos` are valid numbers for that field. This means that manually changing them can lead to unexpected behaviour. If you want to change the fields, use methods like `Duration.add` or `Duration.sub` instead to create a new `Duration`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. If using bun, you can run tests with `bun test`. Most of the work is automated by husky (with the `pre-comit` hook) that you can install with `bun run prepare` or `npm run prepare`. Please make sure to update tests as appropriate.

This project uses prettier for code formatting and biomejs for linting. Both have their respective scripts in `package.json`. For versioning, follow the [Semantic Versioning](https://semver.org/) guidelines.

Although optional, it is recommended to use gitmoji (https://gitmoji.carloscuesta.me/) or cm (https://github.com/Brian3647/cm) for commit messages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
