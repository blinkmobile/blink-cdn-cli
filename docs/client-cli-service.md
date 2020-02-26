# blinkmobile / client-cli

## client CLI Service

The Client CLI Service assumes AWS Credentials specific to Client CLI projects to manage objects in [S3](https://aws.amazon.com/s3/)

### Configuration

These values will most likely only be changed for testing purposes.

The HTTP origin that are used to access the Client CLI Service can be configured in `.blinkmrc.json`:

```json
{
  "cdn": {
    "tenant": "oneblink" | "civicplus",
    "service": {
      "origin": "https://client-cli-service.blinkm.io"
    }
  }
}
```
