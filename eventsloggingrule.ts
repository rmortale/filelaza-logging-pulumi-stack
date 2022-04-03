import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { loggrp } from "./loggroup";

let config = new pulumi.Config();
let prefix = config.require("prefix");

const fleventrule = new aws.cloudwatch.EventRule(`${prefix}-filelaza`, {
    description: "Capture filelaza event",
    eventPattern: JSON.stringify({
        "source": [{"prefix": "ch.dulce.filelaza"}]
    })
});


const fleventtarget = new aws.cloudwatch.EventTarget(`${prefix}-filelaza-event-target`, {
    rule: fleventrule.name,
    targetId: "SendToLogFilelaza",
    arn: loggrp.arn,
});

export const flevttarget = fleventtarget;
