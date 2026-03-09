import boto3
import json

client = boto3.client("bedrock-runtime", region_name="ap-south-1")

try:
    resp = client.invoke_model(
        modelId="anthropic.claude-3-5-sonnet-20241022-v2:0",
        contentType="application/json",
        accept="application/json",
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 10,
            "temperature": 0.3,
            "messages": [{"role": "user", "content": "hi"}]
        })
    )
    print("SUCCESS")
    print(resp["body"].read())
except Exception as e:
    print(f"FAILED: {e}")
