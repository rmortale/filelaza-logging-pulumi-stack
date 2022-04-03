import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { loggrp } from "./loggroup";

let config = new pulumi.Config();
let prefix = config.require("prefix");

const s3objCreated = new aws.cloudwatch.EventRule(`${prefix}-s3ObjectCreated`, {
    description: "Capture each S3 object created event",
    eventPattern: JSON.stringify({
        "source": ["aws.s3"],
        "detail-type": ["Object Created"],
        "detail": {
            "bucket": {
                "name": [{"prefix": "filelaza"}]
            }
        }
    })
});


const s3eventTarget = new aws.cloudwatch.EventTarget(`${prefix}-s3-event-target`, {
    rule: s3objCreated.name,
    targetId: "SendToLogS3",
    arn: loggrp.arn,
});

export const s3evttarget = s3eventTarget;
