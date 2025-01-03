package proto

//go:generate buf generate --template ./buf.gen.servergojson.yaml
//go:generate buf generate --template ./buf.gen.server.yaml
//go:generate buf generate --template ./buf.gen.ts.yaml
//go:generate prettier ../**/*.ts --write --log-level error
