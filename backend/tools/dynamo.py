import boto3, uuid, datetime
from data.schemes import DEMO_JOBS_SEED, DEMO_ANNOUNCEMENTS_SEED

ddb = boto3.resource("dynamodb", region_name="ap-south-1")

def get_jobs(district="Nashik", limit=10):
    try:
        table = ddb.Table("gramsathi-jobs")
        resp = table.scan(Limit=limit)
        return resp.get("Items", [])
    except Exception:
        return DEMO_JOBS_SEED[:limit]

def get_announcements(panchayat_id="DINDORI-NASHIK"):
    try:
        table = ddb.Table("gramsathi-panchayat")
        resp = table.query(
            KeyConditionExpression="panchayat_id = :p",
            ExpressionAttributeValues={":p": panchayat_id},
            Limit=5, ScanIndexForward=False
        )
        return resp.get("Items", [])
    except Exception:
        return DEMO_ANNOUNCEMENTS_SEED

def put_grievance(panchayat_id, category, title, description, urgency="Medium"):
    gid = "GRV-" + str(uuid.uuid4())[:8].upper()
    try:
        table = ddb.Table("gramsathi-panchayat")
        table.put_item(Item={
            "panchayat_id": panchayat_id,
            "sk": f"GRIEVANCE#{gid}",
            "grievance_id": gid,
            "category": category, "title": title,
            "description": description, "urgency": urgency,
            "status": "Submitted",
            "created_at": datetime.datetime.utcnow().isoformat()
        })
    except Exception as e:
        print(f"DynamoDB Error {e}, skipping put_grievance for local demo.")
    return {"grievance_id": gid, "status": "Submitted",
            "message": "24 ghante mein Panchayat ko bheja jayega"}
