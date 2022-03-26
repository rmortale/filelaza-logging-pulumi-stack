import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

let config = new pulumi.Config();
let prefix = config.require("prefix");

const log = new aws.cloudwatch.LogGroup(`/aws/events/${prefix}-events-log`, {
    retentionInDays: 7
});




export const logGroup = log.id;
