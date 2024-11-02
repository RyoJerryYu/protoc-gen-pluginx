# protoc-gen-fieldmask

> This is a fork of [protoc-gen-fieldmask](https://github.com/idodod/protoc-gen-fieldmask) with some modifications.

A protoc plugin that generates fieldmask paths as static type properties for proto messages, which elimantes the usage of error-prone strings.

For example, given the following proto messages:

```proto

syntax = "proto3";

package example;

option go_package = "example/;example";

import "google/protobuf/timestamp.proto";

message Foo {
  string baz = 1;
  int32 xyz = 2;
  Bar my_bar = 3;
  google.protobuf.Timestamp some_date = 4;
}

message Bar {
  string some_field = 1;
  bool another_field = 2;

  message Nested {
      string nested_field = 1;
  }

  Nested nested = 3;
}
```

fieldmasks paths can be used as follows:

```golang
  foo := &example.Foo{}

  // Prints "baz"
  fmt.Println(foo.FieldMaskPaths().Baz())
  
  // Prints "xyz"
  fmt.Println(foo.FieldMaskPaths().Xyz())

  // Prints "my_bar"
  fmt.Println(foo.FieldMaskPaths().MyBar().String())

  // Since baz is a message, we can print a path - "my_bar.some_field"
  fmt.Println(foo.FieldMaskPaths().MyBar().SomeField())

  // Well-known type messages work the same way:
  // Prints "some_date"
  fmt.Println(foo.FieldMaskPaths().SomeDate().String())

  // Prints "some_date.seconds"
  fmt.Println(foo.FieldMaskPaths().SomeDate().Seconds())

  // Nested messages work the same way:
  // Prints "my_bar.nested"
  fmt.Println(foo.FieldMaskPaths().MyBar().Nested().String())

  // Prints "my_bar.nested.nested_field"
  fmt.Println(foo.FieldMaskPaths().MyBar().Nested().NestedField())
```

## Usage

### Installation

```sh
go install github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-go-fieldmask@latest
```

### Executing the plugin

```sh
protoc --fieldmask_out=gen protos/example.proto

# If the plugin is not in your $PATH:
protoc --fieldmask_out=out_dir protos/example.proto --plugin=protoc-gen-fieldmask=/path/to/protoc-gen-fieldmask
```

### Parameters

This plugin do not have any parameters.

## Features

*   Currently the only supported language is `go`.
*   Support messages and nested messages.
*   Support well-known types.
