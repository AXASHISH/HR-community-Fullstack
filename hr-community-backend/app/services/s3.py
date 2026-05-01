import boto3
from app.core.config import settings

def get_s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION
    )

s3_client = get_s3_client()

def upload_to_s3(file_content, object_name, bucket=None):
    if bucket is None:
        bucket = settings.S3_BUCKET_NAME
    try:
        s3_client.put_object(Bucket=bucket, Key=object_name, Body=file_content)
        return True
    except Exception:
        return False
